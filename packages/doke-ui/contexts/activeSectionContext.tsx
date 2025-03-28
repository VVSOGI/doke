"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ActiveSectionContextType {
  activeSection: string;
  changeSection: (sectionName: string) => void;
  updateHash: (hash: string) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  const changeSection = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  const updateHash = (hash: string) => {
    if (hash !== activeSection) {
      setActiveSection(hash);
      window.history.replaceState(null, "", `${pathname}${hash ? `#${hash}` : ""}`);
    }
  };

  useEffect(() => {
    const hashFromUrl = window.location.hash.replace("#", "");
    if (hashFromUrl) {
      setActiveSection(decodeURI(hashFromUrl));
    }
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, changeSection, updateHash }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (context === undefined) {
    throw new Error("useActiveSection must be used within a ActiveSectionProvider");
  }
  return context;
}
