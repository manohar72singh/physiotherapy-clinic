import React, { useState } from "react";
import { Menu, X, Activity } from "lucide-react";

export default function Header({ currentView, setView }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Services", view: "services" },
    { label: "About", view: "about" },
    { label: "Book Now", view: "booking" },
  ];

  const handleNavClick = (view) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => handleNavClick("home")}
        >
          <Activity className="w-6 h-6 text-primary" />
          <span className="font-sans text-xl md:text-2xl font-bold text-primary tracking-tight">
            Zenith Physio
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`font-sans text-sm font-medium transition-colors cursor-pointer py-1 ${
                  isActive
                    ? "text-primary border-b-2 border-primary font-bold"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick("patient")}
            className="text-sm font-semibold bg-primary text-white hover:opacity-90 transition-all px-5 py-2 rounded-full cursor-pointer shadow-sm active:scale-95"
          >
            Patient Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-600 hover:text-primary transition-colors focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg absolute top-full left-0 w-full animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`text-left font-sans text-base font-medium py-2 ${
                currentView === item.view
                  ? "text-primary font-bold"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-[1px] bg-gray-100 my-1" />
          <button
            onClick={() => handleNavClick("patient")}
            className="w-full bg-primary text-white text-center font-semibold py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all"
          >
            Patient Login
          </button>
        </div>
      )}
    </header>
  );
}
