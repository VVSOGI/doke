"use client";

import React, { useRef, useState } from "react";
import { useScroll } from "@/hooks";
import { ExecuteCommandProvider } from "@/contexts";
import { ControllerEndpointTitle, ControllerProperties, ControllerResponseExample, ExecutePanel } from "@/components";
import { Controller, Endpoint, Project } from "@/lib/types";

interface Props {
  projectData: Project;
  controllerData: Controller;
}

export function ControllerPanel({ projectData, controllerData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Endpoint | null>(null);
  const { isScrolling } = useScroll({ containerRef });

  return (
    <div className="relative h-screen flex">
      <div ref={containerRef} className="flex-1 overflow-y-scroll custom-scrollbar">
        {controllerData.endpoints.map((endpoint) => (
          <div key={endpoint.name} id={endpoint.name} className="px-12 py-13">
            <ControllerEndpointTitle endpoint={endpoint} isScrolling={isScrolling} setSelected={setSelected} />
            <div className="mb-12 pr-13 text-2 text-gray-700">{endpoint.description}</div>
            <div className="flex flex-col gap-8">
              <ControllerProperties title="BODY PROPERTIES" properties={endpoint.request.body?.properties} />
              <ControllerProperties title="PARAMS PROPERTIES" properties={endpoint.request.params?.properties} />
              <ControllerProperties title="QUERY PROPERTIES" properties={endpoint.request.query?.properties} />
              <ControllerResponseExample endpoint={endpoint} />
            </div>
          </div>
        ))}
      </div>
      <ExecuteCommandProvider
        projectData={projectData}
        controllerData={controllerData}
        selected={selected}
        setSelected={setSelected}
      >
        <ExecutePanel />
      </ExecuteCommandProvider>
    </div>
  );
}
