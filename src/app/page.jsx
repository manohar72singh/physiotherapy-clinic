"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeView from "../components/HomeView";
import ServicesView from "../components/ServicesView";
import AboutView from "../components/AboutView";
import ContactView from "../components/ContactView";
import BookingView from "../components/BookingView";
import PortalView from "../components/PortalView";
import PatientPanelView from "../components/PatientPanelView";

export default function Page() {
  const [view, setView] = useState("home");
  const [portalRefresh, setPortalRefresh] = useState(false);

  const handleBookingSuccess = () => {
    setPortalRefresh((prev) => !prev);
  };

  const renderActiveView = () => {
    switch (view) {
      case "home":
        return <HomeView setView={setView} />;
      case "services":
        return <ServicesView setView={setView} />;
      case "about":
        return <AboutView setView={setView} />;
      case "contact":
        return <ContactView setView={setView} />;
      case "booking":
        return (
          <BookingView
            setView={setView}
            onBookingSuccess={handleBookingSuccess}
          />
        );
      case "portal":
        return <PortalView setView={setView} triggerRefresh={portalRefresh} />;
      case "patient":
        return <PatientPanelView setView={setView} />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  const isPortal = view === "portal";

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-gray-800 antialiased">
      {/* If we are not in the administrative portal, we render the public navbar */}
      {!isPortal && <Header currentView={view} setView={setView} />}

      {/* Active screen content canvas */}
      <main className="flex flex-col flex-grow">{renderActiveView()}</main>

      {/* If we are not in the administrative portal, we render the public footer */}
      {!isPortal && <Footer setView={setView} />}
    </div>
  );
}
