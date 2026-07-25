import type { Config } from "tailwindcss"

/**
 * Farmer's Dairy — v2 visual reboot ("Daybreak Creamery").
 * A fresh, premium, natural design language: deep teal-pine ink + butter-gold
 * accent on a cool porcelain-milk canvas. Deliberately distinct from the
 * previous forest-green editorial system.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ---- Daybreak Creamery brand palette ---- */
        milk: "#F2F1EA" /* Cool porcelain-milk canvas */,
        "milk-deep": "#E8E6DA" /* Slightly deeper milk for banding */,
        cloud: "#FBFBF7" /* Near-white surface for cards */,
        pine: "#0F2E2B" /* Deep teal-pine — primary ink / dark sections */,
        "pine-soft": "#1C4A44" /* Softer teal for large fills */,
        teal: "#2E7D74" /* Fresh dairy teal — primary brand accent */,
        "teal-bright": "#3FA093" /* Brighter teal for highlights/hovers */,
        butter: "#F0B23E" /* Butter-gold accent (cream/ghee richness) */,
        "butter-deep": "#D9922A" /* Deeper butter for hovers */,
        clay: "#C36A44" /* Warm terracotta for tertiary accents */,
        ink: "#12211F" /* Near-black teal for display type */,
        "ink-soft": "#3B4E4B" /* Muted body text */,

        /* ---- Legacy aliases (remapped to the new palette) so existing
           shop/cart/checkout/legal pages inherit the reboot automatically ---- */
        bg: "#F2F1EA",
        "card-bg": "#FBFBF7",
        "mint-light": "#DCEBE8",
        mint: "#3FA093",
        green: "#2E7D74",
        "green-deep": "#0F2E2B",
        text: "#3B4E4B",
        cream: "#FBFBF7",
        gold: "#F0B23E",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.75rem",
        blob: "42% 58% 61% 39% / 45% 41% 59% 55%",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,46,43,0.04), 0 10px 30px -14px rgba(15,46,43,0.16)",
        lifted:
          "0 2px 6px rgba(15,46,43,0.06), 0 30px 60px -22px rgba(15,46,43,0.30)",
        glow: "0 0 60px -10px rgba(63,160,147,0.55)",
        butter: "0 14px 30px -14px rgba(217,146,42,0.6)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        blobDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1) rotate(0deg)" },
          "33%": { transform: "translate3d(4%,-6%,0) scale(1.08) rotate(6deg)" },
          "66%": { transform: "translate3d(-5%,4%,0) scale(0.94) rotate(-4deg)" },
        },
        marqueeX: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        popIn: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.12)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "floatY 6s ease-in-out infinite",
        blob: "blobDrift 20s ease-in-out infinite",
        "blob-slow": "blobDrift 30s ease-in-out infinite reverse",
        marquee: "marqueeX var(--marquee-duration, 40s) linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "pop-in": "popIn 0.42s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
