import React, { HTMLAttributes } from "react";
import { NotoSans } from "@/lib/assets";
import { DefaultProperty } from "@/lib/types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  properties: Record<string, DefaultProperty> | undefined;
  children: React.ReactNode;
}

export function PropertyTitle({ properties, children, ...props }: Props) {
  const existStyles = properties ? "text-gray-700 font-400" : "text-gray-300 font-300";

  return (
    <div
      className={`
        w-full border-b border-gray-200 pb-5 text-3
        ${NotoSans.className}
        ${existStyles}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
