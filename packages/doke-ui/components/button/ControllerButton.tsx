import React, { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components";
import { NotoSans } from "@/lib/assets";
import { ICONS_LIST } from "@/lib/constants";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  children: React.ReactNode;
}

export function ControllerButton({ isOpen, children, ...props }: Props) {
  return (
    <button
      className={`
        flex items-center justify-between py-2 px-4 rounded-md text-1 font-500 cursor-pointer select-none
        hover:bg-gray-100
        active:bg-gray-200
        ${NotoSans.className}
      `}
      {...props}
    >
      <div>{children}</div>
      <Icon icons={isOpen ? ICONS_LIST.ARROW_DROP_DOWN : ICONS_LIST.ARROW_DROP_UP} />
    </button>
  );
}
