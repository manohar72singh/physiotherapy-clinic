import React from "react";
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  Dumbbell,
} from "lucide-react";

export default function ServicesView({ setView }) {
  return (
    <div className="flex flex-col flex-grow bg-white">
      {/* Service Hero */}
      <section className="bg-gray-50 py-16 px-6 md:px-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="col-span-1 md:col-span-7 flex flex-col gap-5">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold w-fit">
              Specialized Care
            </span>
            <h1 className="font-sans text-3xl md:text-5xl font-bold text-gray-900 tracking-tight select-none">
              Sports Rehabilitation
            </h1>
            <p className="font-sans text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Unlock your peak potential. Our sports rehabilitation program
              combines biomechanical assessments, manual adjustments, and
              progressive muscular loading to recover faster and prevent future
              injuries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={() => setView("booking")}
                className="bg-secondary text-white font-sans text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-opacity-90 hover:scale-[1.01] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Book an Assessment
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("pricing-details");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-gray-300 text-gray-700 font-sans text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-white hover:border-gray-400 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                View Pricing
              </button>
            </div>
          </div>

          <div className="col-span-1 md:col-span-5 relative">
            <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <img
                src="/sports_rehab.jpg"
                alt="Therapist treating sports rehab patient"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Visual floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-secondary">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium font-sans">
                  Success Rate
                </p>
                <p className="text-sm font-bold text-gray-900 font-sans">
                  98.4% Return-to-Play
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Service Details */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-12">
          {/* Service Overview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-sans select-none">
              Service Overview
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our sports rehabilitation model is trusted by recreational runners
              and professional athletes alike. We focus on diagnosing the root
              cause of mechanical failure rather than just masking symptoms,
              ensuring you return to your sport with stronger neural pathways,
              more balanced joints, and increased explosive capacity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[
                "Full kinetic chain alignment analysis",
                "Custom target joint loading protocols",
                "Advanced manual therapy and mobilization",
                "Post-rehab neuromuscular integration",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 font-medium font-sans">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-sans select-none">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-gray-900 font-sans">
                    Accelerated Healing
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Focused tissue stimulation and circulation optimization to
                    slash downtime.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-secondary shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-gray-900 font-sans">
                    Biomechanical Correction
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Eliminating structural compensation to achieve seamless
                    movement integrity.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-gray-900 font-sans">
                    Performance Optimization
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Targeting dynamic power-transfer, core stability, and
                    agility outputs.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-gray-900 font-sans">
                    Injury Prevention
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Proactive musculoskeletal strengthening to safeguard against
                    relapse.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 font-sans mb-6 select-none">
              Your First Session: What to Expect
            </h3>
            <div className="relative border-l border-gray-200 pl-6 ml-3 flex flex-col gap-8">
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white" />
                <h4 className="text-sm font-bold text-gray-900 font-sans">
                  1. Patient intake & history evaluation (15 min)
                </h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  We discuss pain history, previous surgeries, and specific
                  athletic goals or event timelines.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white" />
                <h4 className="text-sm font-bold text-gray-900 font-sans">
                  2. Comprehensive kinetic chain assessment (20 min)
                </h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Active motion analysis mapping joint restrictions, strength
                  deficits, and posture imbalances.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white" />
                <h4 className="text-sm font-bold text-gray-900 font-sans">
                  3. Initial targeted release therapy & trial loading (20 min)
                </h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Immediate pain relief manual work paired with your first
                  custom functional workout prescription.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Sidebar CTA */}
        <div
          id="pricing-details"
          className="col-span-1 lg:col-span-4 flex flex-col gap-6"
        >
          <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className="h-[180px] rounded-xl overflow-hidden bg-gray-100">
              <img
                src="/clinic_interior.jpg"
                alt="Zenith Clinic Workspace"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-bold text-gray-900 font-sans">
                Ready to return to play?
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Take the first step. Secure your clinical biomechanics
                evaluation with our leading sports therapists today.
              </p>
            </div>

            <div className="h-[1px] bg-gray-100" />

            <div className="flex justify-between items-center select-none">
              <span className="text-sm font-medium text-gray-500 font-sans">
                Initial Assessment
              </span>
              <span className="text-2xl font-bold text-primary font-sans">
                $120
                <span className="text-xs font-normal text-gray-400">
                  {" "}
                  / 45 min
                </span>
              </span>
            </div>

            <button
              onClick={() => setView("booking")}
              className="w-full bg-secondary text-white font-sans text-sm font-bold py-3.5 rounded-xl hover:bg-opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
