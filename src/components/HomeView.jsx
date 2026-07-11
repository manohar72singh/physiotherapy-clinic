import React from "react";
import {
  ArrowRight,
  Activity,
  ShieldAlert,
  HeartHandshake,
  CheckCircle2
} from "lucide-react";

export default function HomeView({ setView }) {
  return (
    <div className="flex flex-col flex-grow bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-12">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-clinical-light.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[4px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/95"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-semibold w-fit mb-2 shadow-sm border border-primary/10">
              <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></span>
              Elevating Physiotherapy Standards
            </div>
            
            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-[1.1] select-none">
              Regain Your Strength with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">Precision Care.</span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mt-2 font-medium">
              Experience empathetic, data-driven rehabilitation. We combine
              clinical expertise with modern technology to guide you back to
              peak performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => setView("booking")}
                className="group relative bg-accent text-primary font-sans text-lg font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(0,216,255,0.4)] hover:shadow-[0_0_30px_rgba(0,216,255,0.6)] hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={() => setView("services")}
                className="bg-white border-2 border-primary/10 text-primary font-sans text-lg font-bold px-8 py-4 rounded-full flex items-center justify-center hover:bg-primary-light hover:border-primary-light transition-all cursor-pointer hover:-translate-y-1 shadow-sm"
              >
                Explore Services
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-primary/10">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-primary">4.9/5</span>
                <span className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-wider">Patient Rating</span>
              </div>
              <div className="w-px h-12 bg-primary/10"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-primary">10k+</span>
                <span className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-wider">Sessions Completed</span>
              </div>
            </div>
          </div>

          {/* Right Floating Element */}
          <div className="hidden lg:flex items-center justify-center relative animate-fade-in-up animate-delay-200">
             <div className="absolute w-[120%] h-[120%] bg-accent/20 rounded-full blur-[100px] -z-10" />
             <div className="glass p-8 rounded-[32px] max-w-md w-full relative shadow-2xl border border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                     <Activity className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Live Tracking</h3>
                    <p className="text-gray-600">Monitor your recovery</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-white/50 shadow-sm">
                      <CheckCircle2 className="text-accent w-5 h-5" />
                      <div className="h-2.5 bg-gray-200 rounded-full w-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-accent to-blue-500" style={{width: `${100 - (i * 15)}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-surface px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary font-sans">
              Targeted Recovery Paths
            </h2>
            <p className="text-lg text-text-muted">
              Specialized clinical protocols designed for precise rehabilitation
              and long-term wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Path 1: Sports Rehab */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col gap-6 group relative overflow-hidden animate-fade-in-up animate-delay-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Activity className="w-7 h-7" />
              </div>
              <div className="relative z-10 flex-grow flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-primary font-sans">
                  Sports Rehab
                </h3>
                <p className="text-base text-text-muted leading-relaxed flex-grow">
                  Accelerate recovery from athletic injuries with tailored
                  kinesiology and functional movement therapies.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="font-sans text-base font-bold text-blue-600 flex items-center gap-2 group-hover:text-primary transition-colors mt-2 w-fit cursor-pointer"
                >
                  Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Path 2: Post-Op Care */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col gap-6 group relative overflow-hidden animate-fade-in-up animate-delay-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 relative z-10 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="relative z-10 flex-grow flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-primary font-sans">
                  Post-Op Care
                </h3>
                <p className="text-base text-text-muted leading-relaxed flex-grow">
                  Guided recovery protocols post-surgery to restore mobility,
                  reduce scar tissue, and manage pain effectively.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="font-sans text-base font-bold text-emerald-600 flex items-center gap-2 group-hover:text-primary transition-colors mt-2 w-fit cursor-pointer"
                >
                  Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Path 3: Neurological Physio */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col gap-6 group relative overflow-hidden animate-fade-in-up animate-delay-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 relative z-10 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div className="relative z-10 flex-grow flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-primary font-sans">
                  Neurological Physio
                </h3>
                <p className="text-base text-text-muted leading-relaxed flex-grow">
                  Specialized treatments to improve function and quality of life
                  for individuals with neurological conditions.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="font-sans text-base font-bold text-indigo-600 flex items-center gap-2 group-hover:text-primary transition-colors mt-2 w-fit cursor-pointer"
                >
                  Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
