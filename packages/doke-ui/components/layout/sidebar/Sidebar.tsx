"use client";

import { Divider, SidebarEndpointList, SidebarHeader } from "@/components";

export function Sidebar() {
  return (
    <div className="w-19 h-screen py-6 border-r border-gray-200 bg-white">
      <SidebarHeader />
      <div className="w-full h-[calc(100%-2.25rem)] flex flex-col gap-6 py-8 px-8 overflow-scroll custom-scrollbar">
        <Divider>OVERVIEW</Divider>
        <Divider>ENDPOINTS</Divider>
        <SidebarEndpointList />
      </div>
    </div>
  );
}
