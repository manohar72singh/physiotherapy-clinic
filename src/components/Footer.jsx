import React from "react";

export default function Footer({ setView }) {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-8 max-w-7xl mx-auto gap-4">
        {/* Copyright */}
        <div className="text-sm font-medium text-gray-500 text-center md:text-left select-none">
          © 2024 Zenith Physiotherapy. Empathetic Precision Care.
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
          <button
            onClick={() => setView("contact")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Contact Us
          </button>
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => {}}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Careers
          </button>
        </nav>
      </div>
    </footer>
  );
}
