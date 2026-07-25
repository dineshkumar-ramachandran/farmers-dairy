"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Full-viewport hero scene — a procedural glass milk bottle centre-stage,
 * surrounded by drifting butter cubes and milk droplets. Everything is
 * procedural geometry (no model/texture downloads). The whole rig responds
 * to pointer (parallax tilt) and to scroll progress (camera dolly + spin).
 */

/** Classic milk-bottle silhouette as a lathe profile (radius, height). */
function useBottleGeometry() {
  return useMemo(() => {
    const pts = [
      [0.0, -2.25],
      [1.02, -2.25],
      [1.06, -2.12],
      [1.06, -0.35],
      [1.05, 0.15],
      [0.98, 0.42],
      [0.62, 0.95],
      [0.5, 1.28],
      [0.5, 1.5],
      [0.62, 1.62],
      [0.6, 1.82],
      [0.0, 1.86],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 64);
  }, []);
}

function MilkBottle() {
  const geo = useBottleGeometry();
  return (
    <group>
      {/* Milk-filled glossy body */}
      <mesh geometry={geo} castShadow>
        <meshPhysicalMaterial
          color="#f8f6ee"
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.18}
          sheen={0.6}
          sheenColor="#ffffff"
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Teal cap */}
      <mesh position={[0, 1.74, 0]}>
        <cylinderGeometry args={[0.64, 0.6, 0.34, 48]} />
        <meshStandardMaterial color="#2e7d74" roughness={0.32} metalness={0.15} />
      </mesh>
      <mesh position={[0, 1.92, 0]}>
        <cylinderGeometry args={[0.58, 0.64, 0.06, 48]} />
        <meshStandardMaterial color="#256b63" roughness={0.3} />
      </mesh>
      {/* Butter-gold label band */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.08, 1.08, 1.05, 64, 1, true]} />
        <meshStandardMaterial
          color="#f0b23e"
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Teal pinstripes on the label */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.085, 1.085, 0.07, 64, 1, true]} />
        <meshStandardMaterial color="#0f2e2b" side={THREE.DoubleSide} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[1.085, 1.085, 0.07, 64, 1, true]} />
        <meshStandardMaterial color="#0f2e2b" side={THREE.DoubleSide} roughness={0.5} />
      </mesh>
    </group>
  );
}

const DROP_COUNT = 34;

/** Milk droplets on slow independent orbits around the bottle. */
function Droplets() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const drops = useMemo(
    () =>
      Array.from({ length: DROP_COUNT }, (_, i) => ({
        orbit: 2.4 + Math.random() * 2.6,
        height: -2.2 + Math.random() * 4.4,
        speed: 0.06 + Math.random() * 0.16,
        phase: (i / DROP_COUNT) * Math.PI * 2,
        bob: 0.15 + Math.random() * 0.4,
        scale: 0.03 + Math.random() * 0.08,
      })),
    []
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    drops.forEach((d, i) => {
      const angle = d.phase + t * d.speed;
      dummy.position.set(
        Math.cos(angle) * d.orbit,
        d.height + Math.sin(t * 0.6 + d.phase) * d.bob,
        Math.sin(angle) * d.orbit
      );
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DROP_COUNT]}>
      <sphereGeometry args={[1, 14, 14]} />
      <meshStandardMaterial color="#ffffff" roughness={0.12} />
    </instancedMesh>
  );
}

function ButterCube({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <RoundedBox args={[0.55, 0.55, 0.55]} radius={0.09} smoothness={4} position={position} rotation={rotation}>
      <meshStandardMaterial color="#f0b23e" roughness={0.42} />
    </RoundedBox>
  );
}

/** Rig: pointer parallax + scroll-driven spin & dolly. */
function Rig({
  progress,
  children,
}: {
  progress: MutableRefObject<number>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(({ pointer }) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current; // 0 → 1 across the hero section
    // Base spin advances with scroll; pointer adds interactive tilt.
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.4 + p * Math.PI * 0.9, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.14 + p * 0.25, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, p * -0.6, 0.06);
    // Camera eases back slightly as the user scrolls the hero away.
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + p * 2.4, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.3 + p * 0.8, 0.06);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.3, 8], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 7, 5]} intensity={1.5} castShadow />
      <pointLight position={[-6, 2, -3]} intensity={16} color="#3fa093" />
      <pointLight position={[4, -2, 5]} intensity={9} color="#f0b23e" />

      <Rig progress={progress}>
        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.7}>
          <group position={[0, -0.1, 0]} rotation={[0.04, -0.2, 0.02]} scale={1.05}>
            <MilkBottle />
          </group>
        </Float>
        <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
          <ButterCube position={[2.7, 1.1, -0.8]} rotation={[0.3, 0.5, 0.1]} />
        </Float>
        <Float speed={1.9} rotationIntensity={0.6} floatIntensity={1.4}>
          <ButterCube position={[-2.8, -0.4, -0.6]} rotation={[0.2, -0.4, 0.25]} />
        </Float>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.0}>
          <ButterCube position={[-2.3, 1.7, -1.4]} rotation={[0.5, 0.2, -0.2]} />
        </Float>
        <Droplets />
      </Rig>

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.32}
        scale={12}
        blur={2.8}
        far={3.6}
        resolution={256}
        color="#0f2e2b"
      />

      <Environment resolution={64}>
        <Lightformer intensity={2.4} position={[0, 4, 3]} scale={[10, 4, 1]} color="#ffffff" />
        <Lightformer intensity={1.3} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#cfeee8" />
        <Lightformer intensity={0.9} position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#ffe6b0" />
      </Environment>
    </Canvas>
  );
}
