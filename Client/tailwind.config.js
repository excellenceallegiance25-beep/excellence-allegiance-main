/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#f59e0b", // Amber-500
        secondary: "#10b981", // Emerald-500
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Blue-500
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "ping-delayed": "ping-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        shimmer: "shimmer 1.5s infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        gradient: "gradient 8s ease infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        shake: "shake 0.5s ease-in-out",
        "scale-up": "scale-up 0.5s ease-out forwards",
        progress: "progress 1.5s ease-out forwards",
        twinkle: "twinkle 3s ease-in-out infinite",
        "modal-in": "modal-in 0.3s ease-out forwards",
        "move-grid": "move-grid 20s linear infinite",
        "bounce-delay": "bounce 1s infinite 0.2s",
        "pulse-delay": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s",
        "spin-slow": "spin 3s linear infinite",
        "slide-in": "slide-in 0.5s ease-out forwards",
        "slide-out": "slide-out 0.5s ease-out forwards",
        "rotate-3d": "rotate-3d 20s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
        blink: "blink 1s step-end infinite",
        "zoom-in": "zoom-in 0.5s ease-out forwards",
        "zoom-out": "zoom-out 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "rotate-y": "rotate-y 20s linear infinite",
        "rotate-x": "rotate-x 20s linear infinite",
      },
      
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "ping-delayed": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "70%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "0% 0%",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "100% 100%",
          },
        },
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "scale-up": {
          from: {
            transform: "scale(0)",
          },
          to: {
            transform: "scale(1)",
          },
        },
        progress: {
          from: {
            width: "0",
          },
          to: {
            width: "100%",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "0.1",
          },
          "50%": {
            opacity: "1",
          },
        },
        "modal-in": {
          from: {
            opacity: "0",
            transform: "scale(0.9) translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        "move-grid": {
          from: {
            "background-position": "0 0",
          },
          to: {
            "background-position": "40px 40px",
          },
        },
        "slide-in": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-out": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(100%)",
          },
        },
        "rotate-3d": {
          "0%": {
            transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
          },
          "100%": {
            transform: "rotateX(360deg) rotateY(360deg) rotateZ(360deg)",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)",
          },
        },
        wave: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
        "zoom-in": {
          from: {
            transform: "scale(0)",
          },
          to: {
            transform: "scale(1)",
          },
        },
        "zoom-out": {
          from: {
            transform: "scale(1)",
          },
          to: {
            transform: "scale(0)",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "slide-down": {
          from: {
            transform: "translateY(-100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "rotate-y": {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
        "rotate-x": {
          "0%": {
            transform: "rotateX(0deg)",
          },
          "100%": {
            transform: "rotateX(360deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-diagonal": "linear-gradient(45deg, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.5)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.5)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.5)",
        "glow-green": "0 0 20px rgba(16, 185, 129, 0.5)",
        "glow-orange": "0 0 20px rgba(245, 158, 11, 0.5)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.5)",
        "inner-glow": "inset 0 0 20px rgba(255, 255, 255, 0.1)",
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
        1500: "1500ms",
        2000: "2000ms",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
      },
      scale: {
        102: "1.02",
        105: "1.05",
        110: "1.10",
        120: "1.20",
      },
      rotate: {
        15: "15deg",
        30: "30deg",
        60: "60deg",
        135: "135deg",
        180: "180deg",
        270: "270deg",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        192: "48rem",
        256: "64rem",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
        5: "5px",
        6: "6px",
        10: "10px",
      },
    },
  },
  plugins: [],
};
