"use client";

import { createContext, useContext, ReactNode } from "react";
import { Controller } from "@/lib/types";

interface EndpointsDataContextType {
  endpointData: Controller[];
}

const EndpointsDataContext = createContext<EndpointsDataContextType | undefined>(undefined);

interface EndpointsDataProviderProps {
  children: ReactNode;
  endpointData: Controller[];
}

export function EndpointsDataProvider({ children, endpointData }: EndpointsDataProviderProps) {
  return <EndpointsDataContext.Provider value={{ endpointData }}>{children}</EndpointsDataContext.Provider>;
}

export function useEndpointData() {
  const context = useContext(EndpointsDataContext);
  if (context === undefined) {
    throw new Error("useEndpointData must be used within an EndpointsDataProvider");
  }
  return context;
}
