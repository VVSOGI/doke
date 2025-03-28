"use client";

import React, { memo } from "react";
import { JsonView, PropertyTitle } from "@/components";
import { Endpoint } from "@/lib/types";

interface Props {
  endpoint: Endpoint;
}

function Component({ endpoint }: Props) {
  return (
    <div>
      <PropertyTitle properties={{}}>RESPONSE</PropertyTitle>
      <div className="pt-8 px-7">
        <JsonView src={endpoint.response.example} collapsed={2} name={false} />
      </div>
    </div>
  );
}

export const ControllerResponseExample = memo(Component);
