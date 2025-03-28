"use client";

import React, { memo } from "react";
import { useExecuteCommand } from "@/contexts";
import { useApiExecute, useFormattedCommand } from "@/hooks";
import { ApiExecuteButton, CurlCommand, CurlProperties, ExecuteHeader, ExecuteResponse } from "@/components";
import { NotoSans } from "@/lib/assets";

function Component() {
  const { controllerData, selected, setSelected } = useExecuteCommand();
  const { command } = useFormattedCommand();
  const { responseData, onClickExecute } = useApiExecute();

  const styles = selected ? "flex-1" : "flex-0";

  return (
    selected && (
      <div
        className={`
          sticky top-0 h-screen bg-gray-700 overflow-y-auto custom-scrollbar
          ${styles}
        `}
      >
        <ExecuteHeader onClick={() => setSelected(null)} />
        <div className={`flex flex-col pb-8 px-11 ${NotoSans.className}`}>
          <div className="mb-4 text-5 font-300 text-white">{selected.name}</div>
          <div className="flex gap-4 mb-4 text-3 font-300 text-white">
            <span>{selected.method}</span>
            <span>/{controllerData.basePath + selected.path}</span>
          </div>
          <div className="flex flex-col gap-8">
            <CurlProperties />
            <CurlCommand command={command} />
            {responseData ? (
              <ExecuteResponse title="Actual Server Response" example={responseData} />
            ) : (
              <ExecuteResponse title="Example Response" example={selected.response.example} />
            )}
            <ApiExecuteButton onClick={onClickExecute} />
          </div>
        </div>
      </div>
    )
  );
}

export const ExecutePanel = memo(Component);
