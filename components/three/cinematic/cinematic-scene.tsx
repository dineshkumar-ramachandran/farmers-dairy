"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/* ------------------------------------------------------------------ */
/* Soft floating milk motes                                            */
/* ------------------------------------------------------------------ */
function FloatingParticles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts) return;
    const t = clock.getElapsedTime();
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.0035 + Math.sin(t * 0.3 + seeds[i]) * 0.0016;
      arr[i * 3] += Math.sin(t * 0.2 + seeds[i]) * 0.0022;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Milk ribbon — flowing tube (Scene 3)                                */
/* ------------------------------------------------------------------ */
function Ribbon({ seed, progress }: { seed: number; progress: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 9; i++) {
      const a = seed + i * 0.6;
      pts.push(new THREE.Vector3(Math.sin(a) * 1.6, i * 0.55 - 2.4, Math.cos(a * 1.3) * 1.2));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [seed]);
  const geo = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.11, 12, false), [curve]);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const vis = smoothstep(0.02, 0.14, progress.current) * (1 - smoothstep(0.24, 0.4, progress.current));
    (m.material as THREE.MeshStandardMaterial).opacity = vis;
    m.visible = vis > 0.01;
    m.rotation.y = clock.getElapsedTime() * 0.25 + seed;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial color="#fdfcf6" roughness={0.2} transparent opacity={0} emissive="#fff6e6" emissiveIntensity={0.25} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Packet assembly — particles sampled from the real product image     */
/* ------------------------------------------------------------------ */
type PacketData = { positions: Float32Array; colors: Float32Array; count: number };

function usePacketData(url: string, sample = 120): PacketData | null {
  const [data, setData] = useState<PacketData | null>(null);
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const aspect = img.height / img.width;
      const w = sample;
      const h = Math.round(sample * aspect);
      const cvs = document.createElement("canvas");
      cvs.width = w;
      cvs.height = h;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const { data: px } = ctx.getImageData(0, 0, w, h);
      const pos: number[] = [];
      const col: number[] = [];
      const scale = 4.6;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const idx = (y * w + x) * 4;
          if (px[idx + 3] < 40) continue;
          const r = px[idx] / 255, g = px[idx + 1] / 255, b = px[idx + 2] / 255;
          if (r > 0.985 && g > 0.985 && b > 0.985 && (x < 3 || y < 3 || x > w - 4 || y > h - 4)) continue;
          pos.push(((x / w) - 0.5) * scale * (w / h), -((y / h) - 0.5) * scale, 0);
          col.push(r, g, b);
        }
      }
      if (!alive) return;
      setData({ positions: new Float32Array(pos), colors: new Float32Array(col), count: pos.length / 3 });
    };
    img.src = url;
    return () => {
      alive = false;
    };
  }, [url, sample]);
  return data;
}

function ProductGroup({ progress }: { progress: MutableRefObject<number> }) {
  const data = usePacketData("/images/product-milk-pouch.png");
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const packetRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const starts = useMemo(() => {
    if (!data) return null;
    const s = new Float32Array(data.count * 3);
    const delay = new Float32Array(data.count);
    for (let i = 0; i < data.count; i++) {
      const r = 4 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      s[i * 3] = r * Math.sin(ph) * Math.cos(th);
      s[i * 3 + 1] = r * Math.cos(ph) - 1;
      s[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 1;
      delay[i] = Math.random();
    }
    return { s, delay };
  }, [data]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !data) return;
    const c = new THREE.Color();
    for (let i = 0; i < data.count; i++) {
      c.setRGB(data.colors[i * 3], data.colors[i * 3 + 1], data.colors[i * 3 + 2]);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [data]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !data || !starts) return;
    const p = progress.current;
    const assemble = smoothstep(0.2, 0.45, p);
    const t = clock.getElapsedTime();

    for (let i = 0; i < data.count; i++) {
      const d = starts.delay[i];
      const local = clamp01((assemble - d * 0.35) / (1 - 0.35));
      const e = local * local * (3 - 2 * local);
      const sx = starts.s[i * 3], sy = starts.s[i * 3 + 1], sz = starts.s[i * 3 + 2];
      const tx = data.positions[i * 3], ty = data.positions[i * 3 + 1], tz = data.positions[i * 3 + 2];
      const shimmer = e * Math.sin(t * 1.6 + i) * 0.01;
      dummy.position.set(sx + (tx - sx) * e, sy + (ty - sy) * e + shimmer, sz + (tz - sz) * e);
      dummy.scale.setScalar(0.018 + 0.017 * e);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Scene 5–8: rotate ~15°, drift left to make room for the glass, gentle float.
    if (packetRef.current) {
      const rot = smoothstep(0.45, 0.62, p) * 0.26; // ~15°
      packetRef.current.rotation.y = rot + Math.sin(t * 0.4) * 0.03;
      packetRef.current.position.x = -smoothstep(0.6, 0.82, p) * 1.5;
      packetRef.current.position.y = Math.sin(t * 0.5) * 0.08;
      packetRef.current.position.z = smoothstep(0.5, 0.62, p) * 0.4;
    }
  });

  if (!data) return null;
  return (
    <group ref={packetRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, data.count]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial roughness={0.35} metalness={0} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Glass + pour (Scene 7)                                              */
/* ------------------------------------------------------------------ */
function GlassPour({ progress }: { progress: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Mesh>(null);
  const fillRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const p = progress.current;
    const appear = smoothstep(0.6, 0.72, p);
    const pour = smoothstep(0.7, 0.86, p);
    const fill = smoothstep(0.74, 0.98, p);
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.visible = appear > 0.01;
      groupRef.current.position.set(1.5, -1.0 + Math.sin(t * 0.5) * 0.06, 0);
      groupRef.current.scale.setScalar(0.55 + appear * 0.45);
    }
    if (streamRef.current) {
      streamRef.current.scale.y = pour * (1 - fill * 0.25);
      streamRef.current.visible = pour > 0.02 && fill < 0.98;
    }
    if (fillRef.current) {
      const h = 0.1 + fill * 1.5;
      fillRef.current.scale.y = h;
      fillRef.current.position.y = -0.8 + h / 2;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh>
        <cylinderGeometry args={[0.8, 0.66, 1.9, 40, 1, true]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.16} roughness={0.05} transmission={0.9} thickness={0.4} ior={1.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={fillRef} position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.74, 0.62, 1, 40]} />
        <meshStandardMaterial color="#fbfaf3" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.14, 40]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh ref={streamRef} position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 1.6, 12]} />
        <meshStandardMaterial color="#fdfcf6" emissive="#fff6e6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Camera — slow, calm push-in only                                    */
/* ------------------------------------------------------------------ */
function CameraRig({ progress }: { progress: MutableRefObject<number> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0.1, 0), []);
  useFrame(() => {
    const p = progress.current;
    const z = 6.4 - smoothstep(0, 1, p) * 1.2; // gentle push-in
    camera.position.lerp(new THREE.Vector3(0, 0.15, z), 0.05);
    camera.lookAt(target);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Scene — transparent, floating product only (no scenery)             */
/* ------------------------------------------------------------------ */
export default function CinematicScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.15, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 6]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-5, 2, 3]} intensity={10} color="#dff1ff" />
      <pointLight position={[4, -2, 4]} intensity={6} color="#fff2d8" />

      <FloatingParticles />
      <Ribbon seed={0} progress={progress} />
      <Ribbon seed={2.4} progress={progress} />
      <ProductGroup progress={progress} />
      <GlassPour progress={progress} />

      <CameraRig progress={progress} />

      {/* Studio reflections only — no visible background */}
      <Environment resolution={64}>
        <Lightformer intensity={2.2} position={[0, 4, 4]} scale={[10, 5, 1]} color="#ffffff" />
        <Lightformer intensity={1.4} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} color="#eaf4ff" />
        <Lightformer intensity={1} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} color="#fff0d6" />
      </Environment>
    </Canvas>
  );
}
