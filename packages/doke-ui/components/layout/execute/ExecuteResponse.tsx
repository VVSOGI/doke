import React, { memo } from "react";
import { JsonView } from "@/components";

interface Props {
  title: string;
  example: Record<string, any> | Record<string, any>[];
}

function Component({ title, example }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className={`text-white text-2 font-400`}>{title}</div>
      <div className="w-full h-fit p-8 bg-gray-800 rounded-sm">
        <JsonView
          src={example}
          theme={"chalk"}
          style={{ backgroundColor: "transparent" }}
          displayObjectSize={false}
          enableClipboard={true}
          name={false}
          collapsed={3}
        />
      </div>
    </div>
  );
}

export const ExecuteResponse = memo(Component);
