import React, { memo } from "react";
import { CurlHeaderProperty, CurlProperty } from "@/components";
import { useExecuteCommand } from "@/contexts";

function Component() {
  const { bodyProps, paramsProps, queryProps, headers, setBodyProps, setParamsProps, setQueryProps, setHeaders } =
    useExecuteCommand();

  return (
    <div className="flex flex-col gap-8">
      {bodyProps && <CurlProperty title="BODY PROPERTIES" properties={bodyProps} setProperties={setBodyProps} />}
      {paramsProps && (
        <CurlProperty title="PARAMS PROPERTIES" properties={paramsProps} setProperties={setParamsProps} />
      )}
      {queryProps && <CurlProperty title="QUERY PROPERTIES" properties={queryProps} setProperties={setQueryProps} />}
      {headers && headers.credentials && (
        <CurlHeaderProperty title="HEADER PROPERTIES" properties={headers} setProperties={setHeaders} />
      )}
    </div>
  );
}

export const CurlProperties = memo(Component);
