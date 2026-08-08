import type { Config } from "tailwindcss";

/**
 * Brand tokens are lifted from the Quadbiz Solar logo.
 * Colours are also mirrored as CSS variables in globals.css so non-Tailwind
 * contexts (inline styles, third-party embeds) stay in sync.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#21395C",
        orange: "#FF6B35",
        amber: "#F7931E",
        green: "#6BA542",
        ink: "#1A1A1A",
        grey: "#5B6472",
        "bg-soft": "#F5F7FA",
        white: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale — tight tracking applied via utilities where used.
        h1: ["clamp(2.25rem, 1.6rem + 2.8vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 1.4rem + 1.4vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", { lineHeight: "1.3" }],
      },
      lineHeight: {
        body: "1.7",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(33, 57, 92, 0.08)",
        "card-hover": "0 8px 28px rgba(33, 57, 92, 0.14)",
        header: "0 1px 12px rgba(33, 57, 92, 0.08)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
        // Soft sun-ray radial glow — the signature motif, used sparingly.
        "sun-glow":
          "radial-gradient(60% 60% at 70% 30%, rgba(255, 107, 53, 0.18) 0%, rgba(247, 147, 30, 0.10) 40%, rgba(247, 147, 30, 0) 72%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
