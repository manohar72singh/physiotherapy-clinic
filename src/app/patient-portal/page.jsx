"use client";

import React from "react";
import PatientPanelView from "@/components/PatientPanelView";

export default function PatientPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-gray-800 antialiased">
      <PatientPanelView setView={(view) => {
        if(view === 'home') window.location.href = '/';
      }} />
    </div>
  );
}
