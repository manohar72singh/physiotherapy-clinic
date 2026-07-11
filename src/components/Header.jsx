import React, { useState, useEffect } from "react";
import { Menu, X, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ currentView, setView }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", view: "home" },
    { label: "Services", view: "services" },
    { label: "About", view: "about" },
    { label: "Contact", view: "contact" },
  ];

  const handleNavClick = (view) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 glass shadow-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none group"
          onClick={() => handleNavClick("home")}
        >
          <div className="bg-primary p-2 rounded-xl group-hover:bg-accent transition-colors duration-300">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans text-xl md:text-2xl font-bold tracking-tight text-primary transition-colors duration-300">
            Zenith <span className="text-accent">Physio</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full border border-gray-200/50 shadow-sm">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`font-sans text-sm font-semibold transition-all cursor-pointer px-4 py-2 rounded-full ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100/50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick("booking")}
            className="text-sm font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-5 py-2 rounded-full cursor-pointer"
          >
            Book Now
          </button>
          <button
            onClick={() => router.push("/patient-portal")}
            className="text-sm font-bold bg-primary text-white hover:bg-primary-light transition-all duration-300 px-5 py-2.5 rounded-full cursor-pointer shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
          >
            Patient Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors focus:outline-none ${scrolled ? 'text-primary hover:bg-gray-100' : 'text-primary-light bg-white/50 backdrop-blur-md'}`}
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
        <div className="md:hidden glass-dark absolute top-full left-0 w-full animate-fade-in-up border-t border-white/10 shadow-2xl">
          <div className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-left font-sans text-lg font-semibold py-3 px-4 rounded-xl transition-colors ${
                  currentView === item.view
                    ? "bg-accent/20 text-accent"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-[1px] bg-white/10 my-4" />
            <button
               onClick={() => handleNavClick("booking")}
              className="w-full border border-white/30 text-white font-bold py-3 px-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              Book Now
            </button>
            <button
              onClick={() => router.push("/patient-portal")}
              className="w-full bg-accent text-primary font-bold py-3 px-4 rounded-xl hover:bg-accent-hover transition-colors text-left mt-2 shadow-lg shadow-accent/20"
            >
              Patient Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
