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
        // Apple-inspired near-monochrome on pure white + a glowing orange accent.
        // Keys kept stable (navy/orange/grey/bg-soft) so no site-wide class renames.
        navy: "#1D1D1F", // headings + primary text (near-black)
        ink: "#1D1D1F",
        grey: "#494B4E", // secondary text / descriptions
        muted: "#86868B", // captions / labels
        "muted-dark": "#A1A1A6", // captions / labels on dark surfaces
        panel: "#F5F5F7", // soft-grey section surface (Apple light grey)
        orange: "#C2410C", // text-safe accent (links, eyebrows, nodes) — AA on white & grey
        glow: "#FF6A2C", // bright/luminous accent for fills (tiles, nodes, highlight)
        amber: "#FF5E1E", // CTA gradient end
        line: "#EBEBED", // hairline separators
        "bg-soft": "#FFFFFF", // pure white everywhere (no ivory/grey bands)
        white: "#FFFFFF",
      },
      fontFamily: {
        // Inter for everything — display/heading/sans all resolve to it.
        display: ["var(--font)", "system-ui", "sans-serif"],
        heading: ["var(--font)", "system-ui", "sans-serif"],
        sans: ["var(--font)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Large, tightly-tracked Inter headings (Apple-style).
        h1: ["clamp(2.5rem, 1.7rem + 3.4vw, 3.75rem)", { lineHeight: "1.07", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.875rem, 1.4rem + 1.9vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      lineHeight: {
        body: "1.5",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        // Minimal neutral depth — hairline-soft, never heavy.
        card: "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 14px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 2px 6px rgba(0, 0, 0, 0.06), 0 12px 28px rgba(0, 0, 0, 0.08)",
        header: "0 1px 0 rgba(0, 0, 0, 0.06)",
        soft: "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 14px rgba(0, 0, 0, 0.05)",
        lift: "0 2px 6px rgba(0, 0, 0, 0.06), 0 12px 28px rgba(0, 0, 0, 0.08)",
        // Warm orange glow — accent elements only.
        "glow-btn": "0 8px 22px rgba(255, 106, 44, 0.45), 0 2px 6px rgba(255, 106, 44, 0.3)",
        "glow-btn-hover": "0 12px 30px rgba(255, 106, 44, 0.55), 0 3px 10px rgba(255, 106, 44, 0.35)",
        "glow-tile": "0 6px 16px rgba(255, 106, 44, 0.18)",
        "glow-node": "0 0 0 5px rgba(255, 106, 44, 0.1), 0 6px 16px rgba(255, 106, 44, 0.18)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(135deg, #FF7A3C 0%, #FF5E1E 100%)",
        // Soft radial orange glow behind the hero content (over white).
        "sun-glow":
          "radial-gradient(600px 340px at 50% 8%, rgba(255, 106, 44, 0.12) 0%, transparent 70%)",
        // Peach icon-tile tint.
        "peach-tile": "radial-gradient(circle at 30% 25%, #FFE0D0, #FBEEE8)",
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
