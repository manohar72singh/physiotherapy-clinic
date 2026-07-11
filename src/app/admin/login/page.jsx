"use client";

import React from "react";
import PortalView from "@/components/PortalView";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] text-gray-800 antialiased">
      <PortalView 
        setView={(view) => {
          if (view === "home") {
            window.location.href = "/";
          }
        }} 
        triggerRefresh={false} 
      />
    </div>
  );
}
