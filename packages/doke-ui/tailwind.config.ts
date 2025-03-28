import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import { colors, layout, typography } from "./lib/design";

export default {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors,
    spacing: layout.spacing,
    flex: layout.flex,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,

    extend: {
      width: layout.width,
      maxWidth: layout.width,
      minWidth: layout.width,

      height: layout.height,
      minHeight: layout.height,
      maxHeight: layout.height,
    },
  },
  plugins: [
    function ({ addVariant }: PluginAPI) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
} satisfies Config;
