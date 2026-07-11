"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeView from "../components/HomeView";
import ServicesView from "../components/ServicesView";
import AboutView from "../components/AboutView";
import ContactView from "../components/ContactView";
import BookingView from "../components/BookingView";

export default function Page() {
  const [view, setView] = useState("home");

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
            onBookingSuccess={() => {}}
          />
        );
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-gray-800 antialiased">
      <Header currentView={view} setView={setView} />
      <main className="flex flex-col flex-grow">{renderActiveView()}</main>
      <Footer setView={setView} />
    </div>
  );
}
