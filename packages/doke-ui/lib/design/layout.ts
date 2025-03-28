import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

type LayoutKeys = "width" | "height" | "spacing" | "flex";

export const layout: Record<LayoutKeys, ResolvableTo<KeyValuePair<string, string>> | undefined> = {
  width: {},
  height: {},
  spacing: {
    0: "0rem", //         0px
    1: "0.25rem", //      4px
    2: "0.3125rem", //    5px
    3: "0.375rem", //     6px
    4: "0.5rem", //       8px
    5: "0.625rem", //     10px
    6: "0.75rem", //      12px
    7: "1rem", //         16px
    8: "1.25rem", //      20px
    9: "1.5rem", //       24px
    10: "2rem", //        32px
    11: "2.25rem", //     36px
    12: "3.125rem", //    50px
    13: "3.5rem", //      56px
    14: "5rem", //        80px
    15: "6.25rem", //     100px
    16: "7.5rem", //      120px
    17: "9.375rem", //    150px
    18: "12.5rem", //     200px
    19: "17.5rem", //     280px
  },
  flex: {
    1: "1",
    2: "2",
    3: "3",
  },
};
