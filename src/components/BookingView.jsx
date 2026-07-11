import React, { useState, useEffect } from "react";
import { Check, X, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function BookingView({ setView, onBookingSuccess }) {
  const [step, setStep] = useState(1); // 1: Service, 2: Time, 3: Details, 4: Success
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        if (data.length > 0) setSelectedService(data[0]);
      })
      .catch(console.error);
  }, []);
  const [selectedDate, setSelectedDate] = useState("2024-09-10"); // YYYY-MM-DD (matches Tuesday, Sept 10)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("02:30 PM");
  // Patient Details
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [condition, setCondition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedApt, setBookedApt] = useState(null);

  // Time slots for Tuesday, Sept 10 / Sept 7
  const morningSlots = ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM"];
  const afternoonSlots = [
    "01:00 PM",
    "01:45 PM",
    "02:30 PM",
    "03:15 PM",
    "04:00 PM",
  ];
  // Simulated booked times (matches screenshot, e.g. 01:45 PM is disabled/crossed out)
  const disabledSlots = ["01:45 PM"];

  // Days in September 2024 (1st is Sunday)
  const septDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const startingOffset = 0; // Sunday starting

  const handleDaySelect = (day) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    setSelectedDate(`2024-09-${formattedDay}`);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          email,
          phone,
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          date: selectedDate,
          time: selectedTimeSlot,
          condition: condition || selectedService.name,
          price: selectedService.price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment.");
      }

      const data = await response.json();
      setBookedApt(data.appointment);
      setStep(4);
      if (onBookingSuccess) onBookingSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-50 min-h-screen">
      {/* Transactional Booking Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView("home")}
          >
            <span className="font-sans text-lg md:text-xl font-bold text-primary tracking-tight">
              Zenith Physio
            </span>
            <span className="text-xs text-gray-400 font-medium">
              | Booking Flow
            </span>
          </div>

          <button
            onClick={() => setView("home")}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors cursor-pointer border border-gray-200 hover:border-red-100 rounded-full px-3.5 py-1.5"
          >
            Cancel Booking
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 w-full flex flex-col gap-8 flex-grow">
        {/* Progress Tracker (Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="grid grid-cols-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm text-center font-sans select-none">
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 ${step >= 1 ? "text-primary font-bold" : "text-gray-400"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step > 1 ? "bg-secondary text-white" : "bg-primary text-white"}`}
              >
                {step > 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
              </div>
              <span className="text-xs md:text-sm">Choose Service</span>
            </div>

            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 border-l border-r border-gray-100 ${step >= 2 ? "text-primary font-bold" : "text-gray-400"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step > 2 ? "bg-secondary text-white" : step === 2 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {step > 2 ? <Check className="w-3.5 h-3.5" /> : "2"}
              </div>
              <span className="text-xs md:text-sm">Time & Date</span>
            </div>

            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 ${step >= 3 ? "text-primary font-bold" : "text-gray-400"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
              >
                3
              </div>
              <span className="text-xs md:text-sm">Confirm Details</span>
            </div>
          </div>
        )}

        {/* STEP 1: CHOOSE SERVICE */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="text-center md:text-left select-none">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-sans">
                Select a Recovery Path
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Pick the specialized session matching your clinical needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col gap-4 cursor-pointer relative shadow-sm hover:shadow-md ${
                    selectedService.id === srv.id
                      ? "border-primary ring-2 ring-primary/10 bg-blue-50/10"
                      : "border-gray-200"
                  }`}
                >
                  {selectedService.id === srv.id && (
                    <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 text-lg font-sans pr-8">
                    {srv.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed flex-grow">
                    {srv.description}
                  </p>

                  <div className="h-[1px] bg-gray-100 my-1" />

                  <div className="flex justify-between items-center select-none">
                    <span className="text-xs font-semibold text-gray-400">
                      {srv.duration} mins
                    </span>
                    <span className="text-base font-bold text-primary">
                      ${srv.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-primary text-white font-sans text-sm font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 hover:opacity-95 active:scale-95 shadow-md transition-all cursor-pointer"
              >
                Continue to Time & Date
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PICK DATE & TIME */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
            {/* Left side: Calendar (September 2024) */}
            <div className="col-span-1 md:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 select-none">
                <span className="font-sans font-bold text-gray-900">
                  September 2024
                </span>
                <span className="text-xs text-gray-400 font-medium font-sans">
                  Time Zone: EST
                </span>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 font-sans">
                <span>SU</span>
                <span>MO</span>
                <span>TU</span>
                <span>WE</span>
                <span>TH</span>
                <span>FR</span>
                <span>SA</span>
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {/* Pad days before Sept 1 (which starts on Sunday, so no offset padding needed for Sept 2024) */}
                {septDays.map((day) => {
                  const dayString = day < 10 ? `0${day}` : `${day}`;
                  const fullDateStr = `2024-09-${dayString}`;
                  const isSelected = selectedDate === fullDateStr;
                  const isSpecial = day === 7; // Sept 7 in screenshot has special border outline

                  return (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`h-9 w-9 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer font-medium text-xs font-sans relative ${
                        isSelected
                          ? "bg-primary text-white font-bold shadow-md"
                          : isSpecial
                            ? "border-2 border-primary/40 text-gray-800 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{day}</span>
                      {/* Available slot indicators */}
                      <span
                        className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? "bg-white" : "bg-emerald-400"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side: Slot Selector */}
            <div className="col-span-1 md:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="select-none">
                <h3 className="font-bold text-gray-900 font-sans text-base">
                  {(() => {
                    const d = new Date(selectedDate + "T00:00:00");
                    return d.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    });
                  })()}
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  Please pick an available treatment slot.
                </p>
              </div>

              {/* Morning Slots */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans select-none">
                  Morning
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {morningSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    const isDisabled = disabledSlots.includes(slot);

                    return (
                      <button
                        key={slot}
                        disabled={isDisabled}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 rounded-lg border text-xs font-semibold font-sans transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "border-primary bg-blue-50/10 text-primary ring-1 ring-primary"
                            : isDisabled
                              ? "border-gray-100 bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                              : "border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {slot}
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans select-none">
                  Afternoon
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {afternoonSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    const isDisabled = disabledSlots.includes(slot);

                    return (
                      <button
                        key={slot}
                        disabled={isDisabled}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 rounded-lg border text-xs font-semibold font-sans transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "border-primary bg-blue-50/10 text-primary ring-1 ring-primary"
                            : isDisabled
                              ? "border-gray-100 bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                              : "border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {slot}
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-4">
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedTimeSlot}
                  className="w-full bg-primary text-white font-sans text-sm font-bold py-3.5 rounded-xl hover:opacity-95 active:scale-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  Continue to Confirmation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full border border-gray-200 text-gray-500 font-sans text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Services
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DETAILS FORM */}
        {step === 3 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-lg mx-auto w-full animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 font-sans mb-1 select-none">
              Confirm Your Details
            </h2>
            <p className="text-xs text-gray-400 font-sans mb-6">
              Complete your clinical intake profile to secure the appointment.
            </p>

            <form
              onSubmit={handleBookingSubmit}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 font-sans">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Eleanor James"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 font-sans">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleanor.james@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 font-sans">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 font-sans">
                  Describe Primary Condition / Pain Point
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Guided post-operative rehab on right knee ligament..."
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-none"
                />
              </div>

              {/* Appointment summary review block */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-2 select-none">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans">
                  Booking Review
                </h4>
                <div className="grid grid-cols-2 text-xs md:text-sm text-gray-700 font-sans gap-y-1">
                  <span className="font-medium text-gray-500">
                    Recovery Path
                  </span>
                  <span className="font-semibold text-primary">
                    {selectedService.name}
                  </span>
                  <span className="font-medium text-gray-500">
                    Treatment Session
                  </span>
                  <span>
                    {selectedService.duration} mins ($ {selectedService.price})
                  </span>
                  <span className="font-medium text-gray-500">
                    Selected Date
                  </span>
                  <span>
                    {(() => {
                      const d = new Date(selectedDate + "T00:00:00");
                      return d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    })()}
                  </span>
                  <span className="font-medium text-gray-500">
                    Selected Time
                  </span>
                  <span>{selectedTimeSlot}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-200 text-gray-500 font-sans text-xs font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all cursor-pointer text-center"
                >
                  Back to Calendar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-secondary text-white font-sans text-xs font-bold py-3.5 rounded-xl hover:bg-opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-md text-center disabled:opacity-50"
                >
                  {isSubmitting ? "Securing Slot..." : "Complete Booking"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && bookedApt && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-lg mx-auto w-full text-center flex flex-col items-center gap-6 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-secondary border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-sans">
                Session Confirmed!
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-sm font-sans mx-auto">
                Your sports rehabilitation session is registered. Our
                administrators have prepared your file.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 w-full flex flex-col gap-3 text-left select-none">
              <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider font-sans">
                <span>Appointment Details</span>
                <span className="text-primary font-mono">{bookedApt.id}</span>
              </div>
              <div className="h-[1px] bg-gray-200" />
              <div className="grid grid-cols-2 text-xs md:text-sm text-gray-700 font-sans gap-y-1.5">
                <span className="font-medium text-gray-500">Patient Name</span>
                <span className="font-semibold text-gray-900">
                  {bookedApt.patientName}
                </span>
                <span className="font-medium text-gray-500">Selected Path</span>
                <span className="font-semibold text-primary">
                  {bookedApt.serviceName}
                </span>
                <span className="font-medium text-gray-500">
                  Treatment Date
                </span>
                <span>
                  {(() => {
                    const d = new Date(bookedApt.date + "T00:00:00");
                    return d.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    });
                  })()}
                </span>
                <span className="font-medium text-gray-500">
                  Treatment Time
                </span>
                <span>{bookedApt.time}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                onClick={() => setView("portal")}
                className="flex-1 bg-primary text-white font-sans text-xs font-bold py-3.5 rounded-xl hover:opacity-95 transition-all cursor-pointer shadow-md"
              >
                Go to Clinic Portal
              </button>
              <button
                onClick={() => setView("home")}
                className="flex-1 border border-gray-200 text-gray-600 font-sans text-xs font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                Back to Landing Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
