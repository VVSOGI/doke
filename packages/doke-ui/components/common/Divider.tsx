import React from "react";
import { NotoSans } from "@/lib/assets";

interface Props {
  children: React.ReactNode;
}

export function Divider({ children }: Props) {
  return <div className={`text-2 font-300 text-gray-600 ${NotoSans.className}`}>{children}</div>;
}
