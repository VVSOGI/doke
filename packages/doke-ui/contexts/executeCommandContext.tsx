"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Controller, Endpoint, Project } from "@/lib/types";
import {
  processHeaders,
  processQueryParameters,
  processRequestBody,
  processUrlParameters,
} from "@/lib/utils/processRequestJSON";

interface ExecuteCommandContextType {
  projectData: Project;
  controllerData: Controller;
  selected: Endpoint | null;
  startCommand: string;
  headers: Record<string, any> | undefined;
  bodyProps: Record<string, string> | undefined;
  queryProps: Record<string, string> | undefined;
  paramsProps: Record<string, string> | undefined;
  setSelected: (selected: Endpoint | null) => void;
  setHeaders: React.Dispatch<React.SetStateAction<Record<string, any> | undefined>>;
  setBodyProps: React.Dispatch<React.SetStateAction<Record<string, string> | undefined>>;
  setParamsProps: React.Dispatch<React.SetStateAction<Record<string, string> | undefined>>;
  setQueryProps: React.Dispatch<React.SetStateAction<Record<string, string> | undefined>>;
  getFormattedUrl: (selected: Endpoint) => string;
}

const ExecuteCommandContext = createContext<ExecuteCommandContextType | undefined>(undefined);

interface ExecuteCommandProviderProps {
  children: ReactNode;
  projectData: Project;
  controllerData: Controller;
  selected: Endpoint | null;
  setSelected: (selected: Endpoint | null) => void;
}

export function ExecuteCommandProvider({
  children,
  projectData,
  controllerData,
  selected,
  setSelected,
}: ExecuteCommandProviderProps) {
  const [startCommand, setStartCurlCommand] = useState("");
  const [headers, setHeaders] = useState<Record<string, any>>();
  const [bodyProps, setBodyProps] = useState<Record<string, string>>();
  const [queryProps, setQueryProps] = useState<Record<string, string>>();
  const [paramsProps, setParamsProps] = useState<Record<string, string>>();

  const getFormattedUrl = (selected: Endpoint) => {
    return (
      `${projectData.serverUrl}${controllerData.basePath ? "/" + controllerData.basePath : ""}` +
      selected.path.split("/:")[0]
    );
  };

  useEffect(() => {
    if (!selected) return;
    const url = getFormattedUrl(selected);
    const { body, params, query, headers } = selected.request;
    const { example } = selected.response;
    const startCommand = `curl -X ${selected.method} ${url}`;

    if (params) {
      const requestParams = processUrlParameters(params.properties, example);
      setParamsProps(requestParams);
    }

    if (query) {
      const requestQuery = processQueryParameters(query.properties);
      setQueryProps(requestQuery);
    }

    if (body) {
      const requestBody = processRequestBody(body.properties, example);
      setBodyProps(requestBody);
      setHeaders((prev) => {
        return { ...prev, "Content-Type": "application/json" };
      });
    }

    if (headers) {
      const requestHeader = processHeaders(headers.properties);
      setHeaders((prev) => {
        return { ...prev, ...requestHeader };
      });
    }

    setStartCurlCommand(startCommand);

    return () => {
      setBodyProps(undefined);
      setParamsProps(undefined);
      setQueryProps(undefined);
      setHeaders(undefined);
    };
  }, [selected]);

  const value = {
    projectData,
    controllerData,
    selected,
    startCommand,
    headers,
    bodyProps,
    queryProps,
    paramsProps,
    setHeaders,
    setSelected,
    setBodyProps,
    setParamsProps,
    setQueryProps,
    getFormattedUrl,
  };

  return <ExecuteCommandContext.Provider value={value}>{children}</ExecuteCommandContext.Provider>;
}

export function useExecuteCommand() {
  const context = useContext(ExecuteCommandContext);

  if (context === undefined) {
    throw new Error("useExecuteCommand must be used within an ExecuteCommandProvider");
  }

  return context;
}
