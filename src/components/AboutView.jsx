import React, { useState } from "react";
import { TEAM_MEMBERS } from "../data";
import {
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Quote,
  Check,
  X,
} from "lucide-react";

export default function AboutView({ setView }) {
  const [activeBio, setActiveBio] = useState(null);

  const philosophies = [
    {
      title: "Evidence-Based Practice",
      description:
        "Our clinicians draw directly from the latest peer-reviewed clinical research to construct therapies that deliver tangible muscle-skeletal recovery.",
      icon: ShieldCheck,
    },
    {
      title: "Patient-Centric Approach",
      description:
        "Your recovery path is uniquely yours. We collaborate with you to align rehab timelines with the activities, workloads, and sports you love.",
      icon: HeartPulse,
    },
    {
      title: "Holistic Healing",
      description:
        "We go beyond isolating muscles. Our team addresses lifestyle factors, posture habits, ergonomic workspaces, and stress parameters.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex flex-col flex-grow bg-white">
      {/* About Hero */}
      <section className="bg-gray-50 py-16 px-6 md:px-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold w-fit">
              Our Vision
            </span>
            <h1 className="font-sans text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight select-none">
              Empathetic Precision Care, Led by Experts.
            </h1>
            <p className="font-sans text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              At Zenith, we believe that high-quality clinical support is rooted
              in deep empathy and rigorous scientific precision. Our elite
              practitioners bring decades of research and hands-on clinical
              mastery directly to your recovery program.
            </p>
          </div>

          {/* Featured Dr. Anya */}
          <div className="col-span-1 lg:col-span-5 relative">
            <div className="w-full h-[360px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative">
              <img
                src="/patient_care.jpg"
                alt="Patient Care"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-lg font-bold font-sans">
                  {TEAM_MEMBERS[0].name}
                </p>
                <p className="text-xs text-emerald-300 font-sans font-medium">
                  {TEAM_MEMBERS[0].role}
                </p>
              </div>
            </div>

            {/* Quote Float */}
            <div className="hidden sm:flex absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 max-w-sm gap-4 items-start">
              <Quote className="w-8 h-8 text-primary/20 shrink-0 mt-1" />
              <div>
                <p className="text-xs italic text-gray-500 leading-relaxed font-sans">
                  "True healing begins when we understand not just the mechanics
                  of the body, but the life our patients want to return to."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 select-none">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-sans">
              Our Practitioner Team
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              Meet our board-certified physical therapists dedicated to custom
              neuromuscular restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-[240px] w-full bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg font-sans">
                      {member.name}
                    </h3>
                    <p className="text-xs text-secondary font-medium font-sans mt-0.5">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed flex-grow">
                    {member.description}
                  </p>
                  <button
                    onClick={() => setActiveBio(member.name)}
                    className="w-full py-2.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:text-primary hover:border-primary transition-all cursor-pointer"
                  >
                    Read Full Bio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy of Care */}
      <section className="py-16 px-6 md:px-10 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Bullet Points */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-sans select-none">
              Our Philosophy of Care
            </h2>

            <div className="flex flex-col gap-8">
              {philosophies.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-gray-900 font-sans">
                        {item.title}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="col-span-1 lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 font-sans select-none">
                Ready to start your journey?
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                Connect with our practitioners to schedule a comprehensive
                physical profile evaluation. Let’s outline your path back to
                painless physical motion.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  "Initial assessments available within 48h",
                  "Dedicated one-on-one session with your therapist",
                  "Personalized mobile rehabilitation app program",
                ].map((txt) => (
                  <div
                    key={txt}
                    className="flex items-start gap-2.5 text-xs text-gray-600 font-medium"
                  >
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{txt}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setView("booking")}
                className="w-full bg-primary text-white text-sm font-bold py-3.5 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-md text-center mt-2"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Practitioner bio dialog */}
      {activeBio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-gray-200 shadow-2xl animate-scale-up relative">
            <button
              onClick={() => setActiveBio(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            {(() => {
              const m = TEAM_MEMBERS.find((x) => x.name === activeBio);
              if (!m) return null;
              return (
                <div>
                  <div className="h-[180px] bg-primary relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container" />
                    <div className="absolute bottom-5 left-6 flex gap-4 items-end">
                      <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-white pb-1">
                        <h4 className="text-lg font-bold font-sans">
                          {m.name}
                        </h4>
                        <p className="text-xs text-blue-200 font-sans font-medium">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans">
                        Full Clinical Biography
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed mt-2 font-sans">
                        {m.description} Additionally, {m.name} holds
                        post-graduate clinical credentials in manual
                        articulation, myofascial trigger therapies, and
                        progressive resistance coaching. They frequently consult
                        on orthopedic recovery pathways and sports-focused
                        conditioning.
                      </p>
                    </div>

                    <div className="h-[1px] bg-gray-100" />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setActiveBio(null)}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setActiveBio(null);
                          setView("booking");
                        }}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
