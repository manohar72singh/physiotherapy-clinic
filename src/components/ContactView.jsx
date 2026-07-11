import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactView({ setView }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !message) {
      setErrorMsg("Please populate all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          inquiryType,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to deliver message.");
      }

      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrorMsg(err.message || "Server error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white">
      {/* Contact Hero */}
      <section className="relative min-h-[260px] flex items-center bg-primary overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5HkjL9xTuxJv5Iv-PW0IyvD4FpoEAKi8Bo_eI4oPxRlQpOBGNVyiUSZwBmrSVeibrz-eTwH812VeLsGLRnWJcr1Q8W-LjwW-Vcw2dbXm08nPa9Z7Y9zFg5lGExhtRXggs61hU1639U_PN6DZru9EDGVBURJ3Dms_0WbLfQLqHT14vkihiCu6k6r3grB9ZdsJnCZLWtU22v2YpmzFmQhTPYPWsBbO8nVBGM6Y1UbbaGuryrepN4I2z-dgpH60YQJ_D_h9BppcwNAs')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col gap-3 text-white">
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold w-fit font-sans">
            Contact Support
          </span>
          <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight select-none">
            Get in Touch
          </h1>
          <p className="font-sans text-sm md:text-base text-blue-100 max-w-xl leading-relaxed">
            Have questions about billing, treatments, or practitioner
            scheduling? We are here to provide clear, helpful clinical guidance.
          </p>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Form */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 font-sans mb-6 select-none">
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-col items-center text-center gap-4 animate-scale-up">
                <CheckCircle2 className="w-12 h-12 text-secondary" />
                <div>
                  <h3 className="font-bold text-gray-900 text-base font-sans">
                    Message Delivered Successfully!
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-md font-sans">
                    Thank you for reaching out to Zenith. Our clinical
                    administration team will review your inquiry and reply via
                    email within 24 operational hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-secondary text-white text-xs font-bold rounded-lg hover:bg-opacity-95 transition-all mt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 font-sans">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 font-sans">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 font-sans">
                    Inquiry Type *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-all font-sans cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Book Appointment</option>
                    <option>Billing & Insurance</option>
                    <option>Clinical Records</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 font-sans">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Detail your clinical request or message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 font-medium font-sans">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white font-sans text-sm font-bold py-3.5 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Details & Interactive Map */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          {/* Clinic Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="text-base font-bold text-gray-900 font-sans select-none">
              Clinic Details
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 font-sans">
                    Our Address
                  </h4>
                  <p className="text-sm text-gray-700 mt-0.5 font-sans">
                    750 Broadway, Suite 400
                    <br />
                    New York, NY 10003
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 font-sans">
                    Phone Number
                  </h4>
                  <p className="text-sm text-gray-700 mt-0.5 font-sans">
                    +1 (212) 555-0199
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-400 font-sans">
                    Email Address
                  </h4>
                  <p className="text-sm text-gray-700 mt-0.5 font-sans">
                    care@zenithphysio.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="w-full">
                  <h4 className="text-xs font-bold text-gray-400 font-sans">
                    Opening Hours
                  </h4>
                  <div className="grid grid-cols-2 text-xs md:text-sm text-gray-700 mt-1 gap-y-1 font-sans">
                    <span className="font-medium text-gray-500">Mon - Fri</span>
                    <span>07:00 AM - 07:00 PM</span>
                    <span className="font-medium text-gray-500">Saturday</span>
                    <span>08:00 AM - 02:00 PM</span>
                    <span className="font-medium text-gray-500">Sunday</span>
                    <span className="text-red-500 font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="h-[220px] bg-slate-100 rounded-xl relative overflow-hidden border border-gray-100 flex items-center justify-center">
              {/* Fake Map Grid Drawing */}
              <div className="absolute inset-0 bg-blue-50/40" />
              {/* Roads drawing with SVG / absolute blocks */}
              <div className="absolute left-1/4 top-0 w-8 h-full bg-white border-l border-r border-blue-100/50" />
              <div className="absolute left-2/3 top-0 w-12 h-full bg-white border-l border-r border-blue-100/50" />
              <div className="absolute left-0 top-1/3 w-full h-8 bg-white border-t border-b border-blue-100/50" />
              <div className="absolute left-0 top-3/4 w-full h-10 bg-white border-t border-b border-blue-100/50" />
              {/* Central Park or Green area block */}
              <div className="absolute left-10 top-6 w-16 h-12 bg-emerald-100/60 rounded-lg border border-emerald-200/50 flex items-center justify-center">
                <span className="text-[10px] text-emerald-600 font-medium font-sans">
                  Washington Sq
                </span>
              </div>
              <div className="absolute right-6 bottom-4 w-24 h-10 bg-slate-200/60 rounded-md flex items-center justify-center">
                <span className="text-[9px] text-slate-500 font-sans">
                  Astor Place Station
                </span>
              </div>

              {/* Pin */}
              <div className="absolute left-[45%] top-[40%] flex flex-col items-center">
                <div className="relative animate-bounce">
                  <div className="bg-primary text-white p-2 rounded-full shadow-lg border border-white">
                    <MapPin className="w-5 h-5 fill-white text-primary" />
                  </div>
                  {/* Radar ripple */}
                  <div className="absolute -inset-1 rounded-full bg-primary/30 animate-ping -z-10" />
                </div>
                <div className="bg-white px-2 py-1 rounded border border-gray-200 shadow-md text-[10px] font-bold text-gray-800 mt-1 whitespace-nowrap font-sans">
                  Zenith Physiotherapy
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded border border-gray-200 text-[10px] font-semibold text-gray-500 font-sans shadow-sm">
                Broadway & 8th St
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
