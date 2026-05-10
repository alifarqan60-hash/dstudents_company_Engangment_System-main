/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        scp: ["Source Code Pro", "monospace"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xxs: "0.625rem", // 10px
      },
      colors: {
        // Professional Navy/Primary Scale
        primary: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#0f172a', // Main Brand Color (Lite Black / Slate-900)
          '600': '#1e293b',
          '700': '#334155',
          '800': '#475569',
          '900': '#020617',
        },
        // Professional Grays
        slate: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
        },
        // Other Professional Tokens
        theme: "#0f172a",
        themeblack: "#020617",
        trackgrey: "#f1f5f9",
        customBlue: "#1e293b",
        customDarkBlue: "#0f172a",
        customBlue2: "#334155",
        textgrey: "#475569",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(154.87deg, #020617 27.65%, #1e293b 90.05%)",
        "custom-gradient2":
          "linear-gradient(180deg, #0f172a 51.54%, #f8fafc 100%)",
        "custom-gradient3":
          "linear-gradient(268.11deg, #5F2B38 32.16%, #C1914F 86.86%)",
      },
      transitionProperty: {
        height: "height",
      },
      maxHeight: {
        0: "0",
        full: "1000px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".no-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
