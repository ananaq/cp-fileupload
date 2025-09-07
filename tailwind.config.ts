import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // Figma aliases.
      backgroundColor: () => ({
        emphasis: "var(--color-gray-200)",
        default: "var(--color-white)",
        subtle: "var(--color-gray-100)",
        muted: "var(--color-gray-50)",
        inverted: "var(--color-gray-900)",
        "info-subtle": "var(--color-blue-100)",
        "info-emphasis": "var(--color-blue-500)",
        "success-subtle": "var(--color-green-100)",
        "success-emphasis": "var(--color-green-500)",
        "attention-subtle": "var(--color-orange-100)",
        "attention-emphasis": "var(--color-orange-500)",
        "error-subtle": "var(--color-red-100)",
        "error-emphasis": "var(--color-red-500)",
      }),
      borderColor: () => ({
        emphasis: "var(--color-gray-400)",
        default: "var(--color-gray-300)",
        subtle: "var(--color-gray-200)",
        muted: "var(--color-gray-100)",
      }),
      textColor: () => ({
        emphasis: "var(--color-gray-900)",
        default: "var(--color-gray-700)",
        subtle: "var(--color-gray-500)",
        muted: "var(--color-gray-400)",
        inverted: "var(--color-white)",
        info: "var(--color-blue-900)",
        success: "var(--color-green-800)",
        attention: "var(--color-orange-800)",
        error: "var(--color-red-800)",
      }),
      fill: () => ({
        emphasis: "var(--color-red-200)",
        subtle: "var(--color-gray-500)",
        muted: "var(--color-gray-400)",
        inverted: "var(--color-white)",
        info: "var(--color-blue-300)",
        success: "var(--color-green-500)",
        attention: "var(--color-orange-400)",
        error: "var(--color-red-500)",
        dark: "var(--color-gray-900)",
      }),
    },
  },
  plugins: [],
};
export default config;
