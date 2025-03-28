import React from "react";
import Link from "next/link";
import { NotoSans } from "@/lib/assets";

export function SidebarHeader() {
  return (
    <Link
      href={"/"}
      className={`
        w-fit flex gap-1 items-center py-4 px-8 text-3
        hover:text-gray-500 child:hover:text-blue-200
        active:text-black
        ${NotoSans.className}
      `}
    >
      doke <span className="text-blue-100">API</span>
    </Link>
  );
}
