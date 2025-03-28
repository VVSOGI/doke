"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { ReactJsonViewProps } from "react-json-view";

function Component({ ...props }: ReactJsonViewProps) {
  const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

  return <ReactJson displayDataTypes={false} {...props} />;
}

export const JsonView = memo(Component);
