/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD400",
          "yellow-soft": "#FFE875",
          "yellow-muted": "#FFF3B8",
          amber: "#B87500",
          black: "#0B0B0B",
        },
        surface: {
          cream: "#FFFBED",
          "cream-strong": "#FFF1B8",
          sand: "#F7F7F3",
          navy: "#080A12",
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#101010",
          soft: "#3F3A2B",
          muted: "#746A4A",
          amber: "#6B5A16",
        },
      },
      fontFamily: {
        sans: [
          '"Be Vietnam Pro"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "nav-link": ["clamp(1.05rem,1vw,1.18rem)", { lineHeight: "1.2" }],
        "body-xs": ["clamp(0.75rem,0.72vw,0.82rem)", { lineHeight: "1.55" }],
        "body-sm": ["clamp(0.9rem,0.86vw,1rem)", { lineHeight: "1.65" }],
        body: ["clamp(1rem,1vw,1.125rem)", { lineHeight: "1.75" }],
        "hero-desc": ["clamp(1.06rem,1.35vw,1.32rem)", { lineHeight: "1.72" }],
        "title-sub": [
          "clamp(1.25rem,1.8vw,1.75rem)",
          { lineHeight: "1.14", letterSpacing: "-0.035em" },
        ],
        "title-section": [
          "clamp(2.2rem,4.4vw,5.25rem)",
          { lineHeight: "0.98", letterSpacing: "-0.06em" },
        ],
        "title-hero": [
          "clamp(2.8rem,6.2vw,6.9rem)",
          {
            lineHeight: "1.02",
            letterSpacing: "-0.04em",
          },
        ],
      },
      spacing: {
        "page-x": "clamp(1rem,4vw,5.5rem)",
        "nav-h": "clamp(4.25rem,5.2vw,5.25rem)",
        "hero-y": "clamp(2.25rem,5vh,4.75rem)",
        "section-y": "clamp(4rem,9vw,8rem)",
      },
      borderRadius: {
        pill: "999px",
        card: "28px",
        "card-lg": "36px",
      },
      boxShadow: {
        sticker: "0 5px 0 rgba(16,16,16,0.9), 0 18px 42px rgba(64,48,0,0.16)",
        "card-soft": "0 18px 55px rgba(16,16,16,0.10)",
        floating: "0 24px 70px rgba(16,16,16,0.18)",
        phone: "0 34px 90px rgba(16,16,16,0.28)",
      },
      maxWidth: {
        readable: "62ch",
        "readable-sm": "52ch",
        wide: "88rem",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
};
