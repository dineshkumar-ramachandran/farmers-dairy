import type { Config } from "tailwindcss"
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
        // Farmer's Dairy brand palette — sampled from the wood-pressed
        // groundnut oil packaging. Deep forest green + warm amber cream.
        bg: "#FBEBD1" /* Soft warm cream page background (tinted amber) */,
        cream: "#FBEBD1" /* Alias — used on dark surfaces (footer, buttons) */,
        "card-bg": "#FFFBF3" /* Near-white surface for cards */,
        "mint-light": "#F5DBAE" /* Light amber for chips / subtle accents */,
        mint: "#2D6014" /* Medium forest green for hovers */,
        green: "#1C4610" /* Primary brand green (from Coming Soon stamp) */,
        "green-deep": "#0F2E0A" /* Deep forest ink */,
        text: "#3B4E32" /* Muted body text */,
        butter: "#F9BB6A" /* Amber accent (from oil-bottle backdrop) */,
        "butter-deep": "#E89A47" /* Deeper amber for hovers */,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      fontFamily: {
        /* Body: Plus Jakarta Sans (loaded via next/font in app/layout.tsx).
           Display: Bricolage Grotesque for editorial headings. */
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,46,10,0.04), 0 10px 30px -14px rgba(15,46,10,0.16)",
        lifted: "0 2px 6px rgba(15,46,10,0.06), 0 30px 60px -22px rgba(15,46,10,0.30)",
        glow: "0 0 60px -10px rgba(45,96,20,0.45)",
        butter: "0 14px 30px -14px rgba(232,154,71,0.55)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1)",
        "slide-left": "slideLeft 0.7s cubic-bezier(0.16,1,0.3,1)",
        "slide-right": "slideRight 0.7s cubic-bezier(0.16,1,0.3,1)",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1)",
        "rotate-in": "rotateIn 0.8s ease-out",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "milk-drop": "milkDrop 2s ease-in-out infinite",
        "cow-walk": "cowWalk 8s linear infinite",
        "milk-pour": "milkPour 3s ease-in-out infinite",
        "udder-bounce": "udderBounce 2.5s ease-in-out infinite",
        blob: "blobDrift 20s ease-in-out infinite",
        "blob-slow": "blobDrift 30s ease-in-out infinite reverse",
        marquee: "marqueeX var(--marquee-duration, 40s) linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        rotateIn: {
          "0%": { transform: "rotate(-10deg) scale(0.8)", opacity: "0" },
          "100%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        milkDrop: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.1)" },
        },
        cowWalk: {
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(calc(100vw + 100px))" },
        },
        milkPour: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "100%": { transform: "scaleY(0)", transformOrigin: "top" },
        },
        udderBounce: {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "50%": { transform: "translateY(-5px) scaleY(1.1)" },
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
