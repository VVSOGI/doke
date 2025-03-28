"use client";

import React, { memo, useRef } from "react";
import { isEqual } from "es-toolkit";
import { useIntersectionObserver } from "@/hooks";
import { ExecutePanelOpenButton } from "@/components";
import { NotoSans } from "@/lib/assets";
import { Endpoint } from "@/lib/types";

interface Props {
  endpoint: Endpoint;
  isScrolling: boolean;
  setSelected: React.Dispatch<React.SetStateAction<Endpoint | null>>;
}

function Component({ endpoint, isScrolling, setSelected }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useIntersectionObserver(endpoint.name, isScrolling, ref);

  return (
    <div
      ref={ref}
      className={`
        flex gap-8 mb-10 text-5 font-300
        ${NotoSans.className}
      `}
    >
      <div
        className={`
          px-4 text-white rounded-md
          ${endpoint.method === "POST" && "bg-green-300"}
          ${endpoint.method === "GET" && "bg-blue-200"}
          ${endpoint.method === "PATCH" && "bg-mint-300"}
          ${endpoint.method === "PUT" && "bg-mint-300"}
          ${endpoint.method === "DELETE" && "bg-red-200"}
        `}
      >
        {endpoint.method}/
      </div>
      <div className="w-full flex justify-between items-center pr-10">
        <div>{endpoint.name}</div>
        <ExecutePanelOpenButton
          onClick={() =>
            setSelected((prev) => {
              if (prev && isEqual(endpoint, prev)) {
                return null;
              }
              return endpoint;
            })
          }
        />
      </div>
    </div>
  );
}

export const ControllerEndpointTitle = memo(Component);
