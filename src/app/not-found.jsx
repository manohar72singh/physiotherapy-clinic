"use client";

import React from "react";
import Link from "next/link";
import { Activity, Home, HeartPulse, Mail } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-800 antialiased font-sans">
      {/* Static Header for 404 Page */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 cursor-pointer select-none">
            <Activity className="w-6 h-6 text-[#0056b3]" />
            <span className="text-xl md:text-2xl font-bold text-[#0056b3] tracking-tight">
              Zenith Physio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#0056b3] transition-colors py-1">Services</Link>
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#0056b3] transition-colors py-1">About</Link>
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#0056b3] transition-colors py-1">Book Now</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/patient-portal" className="text-sm font-semibold border border-[#0056b3] text-[#0056b3] hover:bg-[#f0f7ff] transition-all px-5 py-2 rounded-full shadow-sm active:scale-95">
              Patient Login
            </Link>
            <Link href="/admin" className="text-sm font-semibold bg-[#0056b3] text-white hover:bg-[#004494] transition-all px-5 py-2 rounded-full shadow-sm active:scale-95">
              Clinic Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 md:p-16 max-w-2xl w-full flex flex-col items-center text-center">
          
          <h1 className="text-[80px] leading-none font-bold text-[#004494] mb-8">404</h1>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-10">
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-inner border border-gray-100">
              <Image 
                src="/404-robot.jpg" 
                alt="404 Robot Illustration" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md">
            Oops! It looks like you've wandered off the recovery path. The page you are looking for might have been moved or no longer exists.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link 
              href="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#004494] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#003370] transition-colors"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Link>
            <Link 
              href="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#004494] border border-[#004494] font-semibold py-3 px-6 rounded-xl hover:bg-[#f0f7ff] transition-colors"
            >
              <HeartPulse className="w-5 h-5" />
              Services
            </Link>
            <Link 
              href="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>

        </div>
      </main>

      {/* Static Footer for 404 Page */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-medium text-gray-500 font-sans font-bold">
            © 2024 Zenith Physiotherapy. Empathetic Precision Care.
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-500">
            <span className="cursor-pointer hover:text-gray-800 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gray-800 transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-gray-800 transition-colors">Contact Us</span>
            <span className="cursor-pointer hover:text-gray-800 transition-colors">Careers</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
