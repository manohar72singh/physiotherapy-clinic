"use client";

import React from "react";
import PortalView from "@/components/PortalView";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-gray-800 antialiased">
      <PortalView setView={(view) => {
        if(view === 'home') window.location.href = '/';
      }} triggerRefresh={false} />
    </div>
  );
}
