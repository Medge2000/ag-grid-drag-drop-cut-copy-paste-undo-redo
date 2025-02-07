import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure paths are correct
  ],
  theme: {
    extend: {
      backdropBlur: {
        "extra-sm": "2px",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      screens: {
        xs: "480px", // Extra small devices
        // sm: - Small screens (min-width: 640px)
        // md: - Medium screens (min-width: 768px)
        // lg: - Large screens (min-width: 1024px)
        // xl: - Extra large screens (min-width: 1280px)
        "1.5xl": "1440px", // Custom large screens
        // 2xl: - 2x large screens (min-width: 1536px)
        "3xl": "1600px", // Extra large screens
      },
      spacing: {
        96: "24rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        192: "48rem",
        224: "56rem",
        256: "64rem",
        288: "72rem",
      },
      boxShadow: {
        "inset-lg-light-200": "inset 0 0 20px rgba(0, 0, 0, 0.2)",
        "inset-lg-light-500": "inset 0 0 20px rgba(0, 0, 0, 0.5)",
      },
      scale: {
        105: "1.05",
        110: "1.1",
        125: "1.25",
        175: "1.75",
        200: "2",
      },
      transitionProperty: {
        transform: "transform",
      },
      transitionTimingFunction: {
        "ease-out": "ease-out",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        pingPersistent: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        expand: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        recede: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.5)", opacity: "0" },
        },
        infiniteScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        zoomIn5000: "zoomIn 5s infinite alternate",
        fadeInUp: "fadeInUp 1.5s ease-out forwards",
        slideDown: "slideDown 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out forwards",
        pingPersistent: "pingPersistent 1s ease-out",
        scaleUp: "scaleUp 0.3s forwards",
        scaleDown: "scaleDown 0.3s forwards",
        expand: "expand 0.5s forwards",
        recede: "recede 0.5s forwards",
        infiniteScroll: "infiniteScroll 20s linear infinite",
      },
      animationDelay: {
        200: "0.2s",
        500: "0.5s",
        1000: "1s",
      },
      colors: {
        russian_violet: {
          DEFAULT: "#0d0034",
          100: "#03000a",
          200: "#050014",
          300: "#08001f",
          400: "#0a0029",
          500: "#0d0034",
          600: "#24008f",
          700: "#3b00eb",
          800: "#7547ff",
          900: "#baa3ff",
        },
        cerulean: {
          DEFAULT: "#007ea7",
          100: "#f0f7ff", // Lightest cerulean
          125: "#e1f1ff",
          150: "#d2ebff",
          175: "#c3e5ff",
          200: "#b4dfff",
          225: "#a5d9ff",
          250: "#96d3ff",
          275: "#87cdff",
          300: "#78c7ff",
          325: "#69c1ff",
          350: "#5abbff",
          375: "#4bb5ff",
          400: "#3cafff",
          425: "#2da9ff",
          450: "#1ea3ff",
          475: "#0f9dff",
          500: "#007ea7", // Original base color
          525: "#0074a0",
          550: "#006a99",
          575: "#006092",
          600: "#00568b",
          625: "#004c84",
          650: "#00427d",
          675: "#003876",
          700: "#002e6f",
          725: "#002468",
          750: "#001a61",
          775: "#00105a",
          800: "#000653",
          825: "#00004c",
          850: "#000045",
          875: "#00003e",
          900: "#000037",
          925: "#000030",
          950: "#000029",
          975: "#000022", // Darkest cerulean
        },

        folly: {
          DEFAULT: "#ff2c55",
          100: "#3c000c",
          200: "#780018",
          300: "#b50024",
          400: "#f10030",
          500: "#ff2c55",
          600: "#ff5879",
          700: "#ff829b",
          800: "#ffabbc",
          900: "#ffd5de",
        },
        emerald: {
          DEFAULT: "#45cb85",
          100: "#0c2a1b",
          200: "#185435",
          300: "#247f50",
          400: "#30a96a",
          500: "#45cb85",
          600: "#69d59d",
          700: "#8fdfb6",
          800: "#b4eace",
          900: "#daf4e7",
        },
        black_olive: {
          DEFAULT: "#394032",
          100: "#0b0d0a",
          200: "#161914",
          300: "#22261e",
          400: "#2d3227",
          500: "#394032",
          600: "#606b54",
          700: "#889679",
          800: "#afb9a6",
          900: "#d7dcd2",
        },
        grayscale: {
          100: "hsla(0, 0%, 10%, 1)",
          200: "hsla(0, 0%, 20%, 1)",
          300: "hsla(0, 0%, 30%, 1)",
          400: "hsla(0, 0%, 40%, 1)",
          500: "hsla(0, 0%, 50%, 1)",
          600: "hsla(0, 0%, 60%, 1)",
          700: "hsla(0, 0%, 70%, 1)",
          800: "hsla(0, 0%, 80%, 1)",
          900: "hsla(0, 0%, 90%, 1)",
        },
        federal: {
          100: "hsla(244, 100%, 10%, 1)",
          200: "hsla(244, 100%, 20%, 1)",
          300: "hsla(244, 100%, 30%, 1)",
          400: "hsla(244, 100%, 40%, 1)",
          500: "hsla(244, 100%, 50%, 1)",
          600: "hsla(244, 100%, 60%, 1)",
          700: "hsla(244, 100%, 70%, 1)",
          800: "hsla(244, 100%, 80%, 1)",
          900: "hsla(244, 100%, 90%, 1)",
        },
        moonstone: {
          100: "hsla(187, 100%, 10%, 1)",
          200: "hsla(187, 100%, 20%, 1)",
          300: "hsla(187, 100%, 30%, 1)",
          400: "hsla(187, 100%, 40%, 1)",
          500: "hsla(187, 100%, 50%, 1)",
          600: "hsla(187, 100%, 60%, 1)",
          700: "hsla(187, 100%, 70%, 1)",
          800: "hsla(187, 100%, 80%, 1)",
          900: "hsla(187, 100%, 90%, 1)",
        },
        lightgreen: {
          100: "hsla(141, 100%, 10%, 1)",
          200: "hsla(141, 100%, 20%, 1)",
          300: "hsla(141, 100%, 30%, 1)",
          400: "hsla(141, 100%, 40%, 1)",
          500: "hsla(141, 100%, 50%, 1)",
          600: "hsla(141, 100%, 60%, 1)",
          700: "hsla(141, 100%, 70%, 1)",
          800: "hsla(141, 100%, 80%, 1)",
          900: "hsla(141, 100%, 90%, 1)",
        },
        jade: {
          100: "hsla(152, 100%, 10%, 1)",
          200: "hsla(152, 100%, 20%, 1)",
          300: "hsla(152, 100%, 30%, 1)",
          400: "hsla(152, 100%, 40%, 1)",
          500: "hsla(152, 100%, 50%, 1)",
          600: "hsla(152, 100%, 60%, 1)",
          700: "hsla(152, 100%, 70%, 1)",
          800: "hsla(152, 100%, 80%, 1)",
          900: "hsla(152, 100%, 90%, 1)",
        },
        seagreen: {
          100: "hsla(159, 100%, 10%, 1)",
          200: "hsla(159, 100%, 20%, 1)",
          300: "hsla(159, 100%, 30%, 1)",
          400: "hsla(159, 100%, 40%, 1)",
          500: "hsla(159, 100%, 50%, 1)",
          600: "hsla(159, 100%, 60%, 1)",
          700: "hsla(159, 100%, 70%, 1)",
          800: "hsla(159, 100%, 80%, 1)",
          900: "hsla(159, 100%, 90%, 1)",
        },
        syracuseorange: {
          100: "hsla(15, 100%, 10%, 1)",
          200: "hsla(15, 100%, 20%, 1)",
          300: "hsla(15, 100%, 30%, 1)",
          400: "hsla(15, 100%, 40%, 1)",
          450: "hsla(15, 100%, 45%, 1)",
          500: "hsla(15, 100%, 50%, 1)",
          600: "hsla(15, 100%, 60%, 1)",
          700: "hsla(15, 100%, 70%, 1)",
          800: "hsla(15, 100%, 80%, 1)",
          900: "hsla(15, 100%, 90%, 1)",
        },
        orange: {
          100: "hsla(29, 100%, 10%, 1)",
          200: "hsla(29, 100%, 20%, 1)",
          300: "hsla(29, 100%, 30%, 1)",
          400: "hsla(29, 100%, 40%, 1)",
          500: "hsla(29, 100%, 50%, 1)",
          600: "hsla(29, 100%, 60%, 1)",
          700: "hsla(29, 100%, 70%, 1)",
          800: "hsla(29, 100%, 80%, 1)",
          900: "hsla(29, 100%, 90%, 1)",
        },
        cryola: {
          100: "hsla(345, 100%, 10%, 1)",
          200: "hsla(345, 100%, 20%, 1)",
          300: "hsla(345, 100%, 30%, 1)",
          400: "hsla(345, 100%, 40%, 1)",
          500: "hsla(345, 100%, 50%, 1)",
          600: "hsla(345, 100%, 60%, 1)",
          700: "hsla(345, 100%, 70%, 1)",
          800: "hsla(345, 100%, 80%, 1)",
          900: "hsla(345, 100%, 90%, 1)",
        },
        hotpink: {
          100: "hsla(333, 100%, 10%, 1)",
          200: "hsla(333, 100%, 20%, 1)",
          300: "hsla(333, 100%, 30%, 1)",
          400: "hsla(333, 100%, 40%, 1)",
          500: "hsla(333, 100%, 50%, 1)",
          600: "hsla(333, 100%, 60%, 1)",
          700: "hsla(333, 100%, 70%, 1)",
          800: "hsla(333, 100%, 80%, 1)",
          900: "hsla(333, 100%, 90%, 1)",
        },
        cherrypink: {
          100: "hsla(345, 77%, 10%, 1)",
          200: "hsla(345, 77%, 20%, 1)",
          300: "hsla(345, 77%, 30%, 1)",
          400: "hsla(345, 77%, 40%, 1)",
          500: "hsla(345, 77%, 50%, 1)",
          600: "hsla(345, 77%, 60%, 1)",
          700: "hsla(345, 77%, 70%, 1)",
          800: "hsla(345, 77%, 80%, 1)",
          900: "hsla(345, 77%, 90%, 1)",
        },
        ocean: {
          DEFAULT: "#4A90E2",
          50: "#f0f7ff", // Lightest, almost white blue
          100: "#e0f0ff",
          200: "#bae0ff",
          300: "#7cc5fb",
          400: "#399bf2",
          500: "#4A90E2", // Primary blue
          600: "#3b79cc",
          700: "#2d5c9e",
          800: "#1e3a64",
          900: "#0f1f3d", // Darkest blue
        },
      },
    },
  },
  darkMode: "class", // or 'media' or false
  // variants: {
  //   extend: {},
  // },
  plugins: [
    forms,
    aspectRatio,
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".animate-delay-200": {
          "animation-delay": "0.2s",
        },
        ".animate-delay-500": {
          "animation-delay": "0.5s",
        },
        ".animate-delay-1000": {
          "animation-delay": "1s",
        },
      });
    },
  ],
};

export default config;
