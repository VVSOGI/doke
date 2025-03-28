import React, { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components";
import { ICONS_LIST } from "@/lib/constants";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function ExecutePanelOpenButton({ className, ...props }: Props) {
  return (
    <button
      className={`
          flex items-center justify-between py-2 border rounded-md select-none
          hover:bg-gray-100 hover:text-gray-700
          active:bg-white active:text-black
          ${className}
        `}
      {...props}
    >
      <div className="pl-8 text-2 font-500">Execute</div>
      <Icon className="px-4" icons={ICONS_LIST.PLAY_ARROW} />
    </button>
  );
}
