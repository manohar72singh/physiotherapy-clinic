import React from "react";
import {
  ArrowRight,
  Activity,
  ShieldAlert,
  HeartHandshake,
} from "lucide-react";
import { motion } from "motion/react";

export default function HomeView({ setView }) {
  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-medium w-fit mb-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Elevating Physiotherapy Standards
            </div>
            
            <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] select-none">
              Regain Your Strength with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Precision Care.</span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mt-2">
              Experience empathetic, data-driven rehabilitation. We combine
              clinical expertise with modern technology to guide you back to
              peak performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => setView("booking")}
                className="group relative bg-secondary text-white font-sans text-base font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/30 hover:shadow-secondary/50 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
              
              <button
                onClick={() => setView("services")}
                className="border-2 border-gray-200 text-gray-700 font-sans text-base font-semibold px-8 py-4 rounded-xl flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                Explore Services
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">4.9/5</span>
                <span className="text-sm text-gray-500 font-medium mt-1">Patient Rating</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">10k+</span>
                <span className="text-sm text-gray-500 font-medium mt-1">Sessions Completed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative lg:h-[650px] flex items-center justify-center w-full"
          >
            {/* Decorative Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/15 to-secondary/15 rounded-full blur-3xl -z-10" />
            
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img 
                src="/clinic_hero_modern.png" 
                alt="Modern Physiotherapy Clinic" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Glassmorphism Floating Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-72 bg-white/70 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Personalized Care</p>
                    <p className="text-xs text-gray-600 mt-0.5">Tailored recovery plans</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2 mb-12 text-center md:text-left select-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-sans">
              Targeted Recovery Paths
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl">
              Specialized clinical protocols designed for precise rehabilitation
              and long-term wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Path 1: Sports Rehab */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col gap-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-50 rounded-bl-full transition-transform group-hover:scale-105" />
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary relative z-10">
                <Activity className="w-6 h-6" />
              </div>
              <div className="relative z-10 flex-grow flex flex-col gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 font-sans">
                  Sports Rehab
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed flex-grow">
                  Accelerate recovery from athletic injuries with tailored
                  kinesiology and functional movement therapies.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="font-sans text-sm font-semibold text-primary flex items-center gap-1 hover:text-primary-container transition-colors mt-4 w-fit cursor-pointer"
                >
                  Learn more <ArrowRight className="w-4 h-4 text-xs" />
                </button>
              </div>
            </div>

            {/* Path 2: Post-Op Care */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col gap-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-50 rounded-bl-full transition-transform group-hover:scale-105" />
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-secondary relative z-10">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="relative z-10 flex-grow flex flex-col gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 font-sans">
                  Post-Op Care
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed flex-grow">
                  Guided recovery protocols post-surgery to restore mobility,
                  reduce scar tissue, and manage pain effectively.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="font-sans text-sm font-semibold text-primary flex items-center gap-1 hover:text-primary-container transition-colors mt-4 w-fit cursor-pointer"
                >
                  Learn more <ArrowRight className="w-4 h-4 text-xs" />
                </button>
              </div>
            </div>

            {/* Path 3: Neurological Physio */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col gap-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-50 rounded-bl-full transition-transform group-hover:scale-105" />
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 relative z-10">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="relative z-10 flex-grow flex flex-col gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 font-sans">
                  Neurological Physio
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed flex-grow">
                  Specialized treatments to improve function and quality of life
                  for individuals with neurological conditions.
                </p>
                <button
                  onClick={() => setView("services")}
                  className="font-sans text-sm font-semibold text-primary flex items-center gap-1 hover:text-primary-container transition-colors mt-4 w-fit cursor-pointer"
                >
                  Learn more <ArrowRight className="w-4 h-4 text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
