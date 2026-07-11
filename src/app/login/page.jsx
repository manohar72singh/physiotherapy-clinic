"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, Users, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "patient";
  
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });

    if (res.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      window.location.href = role === "admin" ? "/admin" : "/patient-portal";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f9fb] px-4 font-sans">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer select-none">
        <Activity className="w-6 h-6 text-primary" />
        <span className="font-sans text-xl font-bold text-primary tracking-tight">Zenith Physio</span>
      </Link>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-400"></div>
        
        <div className="flex justify-center mb-6 mt-2">
          <div className="bg-primary/10 p-4 rounded-2xl">
            {role === "admin" ? <ShieldAlert className="w-10 h-10 text-primary" /> : <Users className="w-10 h-10 text-primary" />}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          {role === "admin" ? "Admin Portal Login" : "Patient Portal Login"}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6 px-4">
          Enter your credentials to access the secure dashboard.
        </p>

        {/* Role Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === "patient" ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"}`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === "admin" ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"}`}
          >
            Administrator
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center font-medium border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Email / Username</label>
            <input 
              type={role === "admin" ? "text" : "email"} 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all" 
              placeholder={role === "admin" ? "admin@zenithphysio.com" : "patient@example.com"}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all" 
              placeholder="••••••••"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all mt-4 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Authenticating..." : "Access Portal"}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center gap-2"
          >
            &larr; Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f9fb]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
