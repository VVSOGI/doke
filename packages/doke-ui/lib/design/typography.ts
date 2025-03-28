import { ThemeConfig } from "tailwindcss/types/config";

interface Typography {
  fontSize: ThemeConfig["fontSize"];
  fontFamily: ThemeConfig["fontFamily"];
  fontWeight: ThemeConfig["fontWeight"];
}

export const typography: Typography = {
  fontSize: {
    0: ["0.65rem", { lineHeight: "1rem" }],
    1: ["0.85rem", { lineHeight: "1.25rem" }],
    2: ["1rem", { lineHeight: "1.5rem" }],
    3: ["1.25rem", { lineHeight: "1.75rem" }],
    4: ["1.5rem", { lineHeight: "2rem" }],
    5: ["2rem", { lineHeight: "2.5rem" }],
    6: ["2.5rem", { lineHeight: "3rem" }],
    7: ["3rem", { lineHeight: "3.5rem" }],
  },

  fontFamily: {},
  fontWeight: {
    100: "100",
    200: "200",
    300: "300",
    400: "400",
    500: "500",
    600: "600",
    700: "700",
    800: "800",
    900: "900",
  },
};
