import React, { useState, useEffect } from "react";
import { SERVICES } from "../data";
import {
  Building2,
  Plus,
  LayoutDashboard,
  CalendarRange,
  Users,
  Receipt,
  MailCheck,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Check,
  RefreshCw,
  X,
  ShieldAlert,
} from "lucide-react";

export default function PortalView({ setView, triggerRefresh }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  // State for data fetched from server
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    todayAdmissions: 24,
    activePatients: 186,
    totalRevenue: 4250,
  });
  const [loading, setLoading] = useState(true);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // New manual appointment form state
  const [newPatientName, setNewPatientName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newServiceId, setNewServiceId] = useState(SERVICES[0].id);
  const [newDate, setNewDate] = useState("2024-09-10");
  const [newTime, setNewTime] = useState("09:00 AM");
  const [newCondition, setNewCondition] = useState("");

  const fetchData = async () => {
    try {
      const [apptsRes, invsRes, patsRes, msgsRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/invoices"),
        fetch("/api/patients"),
        fetch("/api/messages"),
      ]);

      if (apptsRes.ok) setAppointments(await apptsRes.json());
      if (invsRes.ok) setInvoices(await invsRes.json());
      if (patsRes.ok) setPatients(await patsRes.json());
      if (msgsRes.ok) setMessages(await msgsRes.json());
      
      const statsRes = await fetch("/api/stats");
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      console.error("Error fetching portal data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [triggerRefresh, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f9fb] px-4 font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-gray-100 relative overflow-hidden">
          {/* Top colored accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-400"></div>
          
          <div className="flex justify-center mb-6 mt-2">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <ShieldAlert className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Clinic Portal Login</h2>
          <p className="text-center text-sm text-gray-500 mb-8 px-4">Enter your administrative credentials to access the secure clinic dashboard.</p>
          
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center font-medium border border-red-100">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Username</label>
              <input 
                type="text" 
                value={adminUsername} 
                onChange={e => setAdminUsername(e.target.value)} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all" 
                placeholder="Enter username"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={adminPassword} 
                onChange={e => setAdminPassword(e.target.value)} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all" 
                placeholder="••••••••"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all mt-4 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Access Portal
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button 
              onClick={() => setView('home')} 
              className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center gap-2"
            >
              ← Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMessageStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/messages/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualBooking = async (e) => {
    e.preventDefault();
    if (!newPatientName || !newEmail) return;

    const selectedSrv =
      SERVICES.find((s) => s.id === newServiceId) || SERVICES[0];

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: newPatientName,
          email: newEmail,
          phone: newPhone,
          serviceId: selectedSrv.id,
          serviceName: selectedSrv.name,
          date: newDate,
          time: newTime,
          condition: newCondition || selectedSrv.name,
          price: selectedSrv.price,
        }),
      });

      if (response.ok) {
        setIsNewAppointmentOpen(false);
        setNewPatientName("");
        setNewEmail("");
        setNewPhone("");
        setNewCondition("");
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter logic based on tab and search query
  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredPatients = patients.filter(
    (pat) =>
      pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pat.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pat.condition.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* 1. Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-100 flex items-center gap-2.5 select-none">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-secondary">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm tracking-tight leading-none">
                City Center Clinic
              </h2>
              <p className="text-[10px] text-gray-400 font-semibold uppercase mt-1">
                Zenith Physio
              </p>
            </div>
          </div>

          {/* New Appointment Button */}
          <div className="px-4 py-4">
            <button
              onClick={() => setIsNewAppointmentOpen(true)}
              className="w-full bg-secondary text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-opacity-95 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 flex flex-col gap-1 select-none">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              {
                id: "appointments",
                label: "Appointments",
                icon: CalendarRange,
              },
              { id: "patients", label: "Patient Records", icon: Users },
              { id: "invoicing", label: "Invoicing", icon: Receipt },
              {
                id: "messages",
                label: "Contact Messages",
                icon: MailCheck,
                badge: messages.filter((m) => m.status === "Unread").length,
              },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4.5 h-4.5" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-sans font-extrabold">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-4">
          <button className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all cursor-pointer">
            <HelpCircle className="w-4.5 h-4.5" />
            <span>Help Center</span>
          </button>

          <button
            onClick={() => setView("home")}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout Portal</span>
          </button>

          <div className="h-[1px] bg-gray-100" />

          {/* Admin profile */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-none">
                Admin Coordinator
              </p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                care@zenithphysio.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 shrink-0 flex justify-between items-center px-8">
          <div className="flex items-center gap-2 select-none">
            <h1 className="text-sm md:text-base font-extrabold text-gray-900 capitalize font-sans">
              {activeTab === "overview"
                ? "Dashboard Overview"
                : activeTab === "messages"
                  ? "Contact Messages Feed"
                  : activeTab}
            </h1>
            <span className="text-xs text-gray-400 font-semibold">
              • Private Workspace
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary w-52 transition-all"
              />
            </div>

            {/* Notification bell */}
            <div className="relative cursor-pointer hover:text-primary transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-black">
                {messages.filter((m) => m.status === "Unread").length}
              </span>
            </div>

            {/* Manual Sync trigger */}
            <button
              onClick={fetchData}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              title="Refresh database"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-gray-400 font-bold font-sans">
                  Syncing workspace database...
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                    {/* Stat Card 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
                      <span className="text-xs text-gray-400 font-bold font-sans">
                        Today's Admissions
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-gray-900 font-sans">
                          {stats.todayAdmissions}
                        </span>
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +12%
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 font-sans font-medium">
                        Scheduled & pending triage
                      </p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
                      <span className="text-xs text-gray-400 font-bold font-sans">
                        Active Patients
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-gray-900 font-sans">
                          {stats.activePatients}
                        </span>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">
                          This month
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 font-sans font-medium">
                        Under active therapy prescription
                      </p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
                      <span className="text-xs text-gray-400 font-bold font-sans">
                        Daily Revenue
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold text-gray-900 font-sans">
                          ${stats.totalRevenue.toLocaleString()}
                        </span>
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +5%
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2 font-sans font-medium">
                        Paid copay & insurance claims
                      </p>
                    </div>
                  </div>

                  {/* Dual Grid: Recent Records & Clinical Invoices */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Patient Records */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
                      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center select-none">
                        <h3 className="text-sm font-bold text-gray-900 font-sans">
                          Recent Patient Records
                        </h3>
                        <button
                          onClick={() => setActiveTab("patients")}
                          className="text-xs font-bold text-primary flex items-center hover:text-primary-container"
                        >
                          View all <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 select-none">
                            <tr>
                              <th className="px-6 py-3.5">Patient Name</th>
                              <th className="px-6 py-3.5">Condition</th>
                              <th className="px-6 py-3.5">Last Visit</th>
                              <th className="px-6 py-3.5 text-right">Visits</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-gray-700">
                            {patients.slice(0, 4).map((p) => (
                              <tr
                                key={p.id}
                                className="hover:bg-gray-50/50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900">
                                      {p.name}
                                    </span>
                                    <span className="text-[10px] text-gray-400 mt-0.5">
                                      {p.id}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                  {p.condition}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-500">
                                  {p.lastVisit}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                  {p.totalAppointments}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right: Clinical Invoices */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
                      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center select-none">
                        <h3 className="text-sm font-bold text-gray-900 font-sans">
                          Clinical Invoices
                        </h3>
                        <button
                          onClick={() => setActiveTab("invoicing")}
                          className="text-xs font-bold text-primary flex items-center hover:text-primary-container"
                        >
                          View all <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 select-none">
                            <tr>
                              <th className="px-6 py-3.5">Invoice ID</th>
                              <th className="px-6 py-3.5">Patient</th>
                              <th className="px-6 py-3.5">Status</th>
                              <th className="px-6 py-3.5 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-gray-700">
                            {invoices.slice(0, 4).map((inv) => (
                              <tr
                                key={inv.id}
                                className="hover:bg-gray-50/50 transition-colors"
                              >
                                <td className="px-6 py-4 font-semibold text-gray-900">
                                  {inv.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">
                                  {inv.patientName}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                      inv.status === "Paid"
                                        ? "bg-emerald-50 text-secondary"
                                        : "bg-amber-50 text-amber-600"
                                    }`}
                                  >
                                    {inv.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-primary">
                                  ${Number(inv.amount).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: APPOINTMENTS */}
              {activeTab === "appointments" && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center select-none">
                    <h3 className="text-sm font-bold text-gray-900 font-sans">
                      All Scheduled Treatments
                    </h3>
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      {filteredAppointments.length} Bookings
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase border-b border-gray-100 select-none">
                        <tr>
                          <th className="px-6 py-3.5">Apt ID</th>
                          <th className="px-6 py-3.5">Patient Name</th>
                          <th className="px-6 py-3.5">Recovery Path</th>
                          <th className="px-6 py-3.5">Schedule</th>
                          <th className="px-6 py-3.5">Status</th>
                          <th className="px-6 py-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-12 text-center text-gray-400 font-medium select-none"
                            >
                              No appointments found matching search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((apt) => (
                            <tr
                              key={apt.id}
                              className="hover:bg-gray-50/50 transition-colors"
                            >
                              <td className="px-6 py-4 font-semibold text-gray-900">
                                {apt.id}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-gray-900">
                                    {apt.patientName}
                                  </span>
                                  <span className="text-[10px] text-gray-400 mt-0.5">
                                    {apt.email} • {apt.phone || "N/A"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-primary">
                                {apt.serviceName}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-gray-800">
                                    {apt.date}
                                  </span>
                                  <span className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                                    {apt.time}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    apt.status === "Confirmed"
                                      ? "bg-blue-50 text-blue-600"
                                      : apt.status === "Completed"
                                        ? "bg-emerald-50 text-secondary"
                                        : apt.status === "Pending"
                                          ? "bg-amber-50 text-amber-600"
                                          : "bg-red-50 text-red-500"
                                  }`}
                                >
                                  {apt.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                  {apt.status === "Pending" && (
                                    <button
                                      onClick={() =>
                                        handleUpdateStatus(apt.id, "Confirmed")
                                      }
                                      className="p-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                                      title="Confirm appointment"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                  )}
                                  {apt.status !== "Completed" &&
                                    apt.status !== "Cancelled" && (
                                      <button
                                        onClick={() =>
                                          handleUpdateStatus(
                                            apt.id,
                                            "Completed",
                                          )
                                        }
                                        className="p-1 rounded bg-emerald-50 text-secondary hover:bg-emerald-100 transition-colors cursor-pointer"
                                        title="Complete session"
                                      >
                                        <CheckCircle2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  {apt.status !== "Cancelled" &&
                                    apt.status !== "Completed" && (
                                      <button
                                        onClick={() =>
                                          handleUpdateStatus(
                                            apt.id,
                                            "Cancelled",
                                          )
                                        }
                                        className="p-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                                        title="Cancel appointment"
                                      >
                                        <XCircle className="w-4 h-4" />
                                      </button>
                                    )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PATIENTS */}
              {activeTab === "patients" && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center select-none">
                    <h3 className="text-sm font-bold text-gray-900 font-sans">
                      Patient Directory
                    </h3>
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      {filteredPatients.length} Patients Registered
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase border-b border-gray-100 select-none">
                        <tr>
                          <th className="px-6 py-3.5">Patient ID</th>
                          <th className="px-6 py-3.5">Name</th>
                          <th className="px-6 py-3.5">Condition</th>
                          <th className="px-6 py-3.5">Contact</th>
                          <th className="px-6 py-3.5">Last Visit</th>
                          <th className="px-6 py-3.5 text-right">
                            Total Visits
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {filteredPatients.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-12 text-center text-gray-400 font-medium select-none"
                            >
                              No patient files found.
                            </td>
                          </tr>
                        ) : (
                          filteredPatients.map((pat) => (
                            <tr
                              key={pat.id}
                              className="hover:bg-gray-50/50 transition-colors"
                            >
                              <td className="px-6 py-4 font-semibold text-gray-900">
                                {pat.id}
                              </td>
                              <td className="px-6 py-4 font-bold text-gray-900">
                                {pat.name}
                              </td>
                              <td className="px-6 py-4 font-medium text-primary">
                                {pat.condition}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-0.5 text-[10px] text-gray-500 font-medium">
                                  <span>{pat.email}</span>
                                  <span>{pat.phone || "N/A"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-500">
                                {pat.lastVisit}
                              </td>
                              <td className="px-6 py-4 text-right font-extrabold text-gray-900">
                                {pat.totalAppointments}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: INVOICING */}
              {activeTab === "invoicing" && (
                <div className="flex flex-col gap-8 animate-fade-in">
                  {/* Revenue metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 select-none">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2">
                      <span className="text-xs text-gray-400 font-bold">
                        Paid Clinical Invoices
                      </span>
                      <h4 className="text-3xl font-bold text-secondary">
                        ${stats.totalRevenue.toLocaleString()}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-1">
                        Cleared through insurance / copay
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2">
                      <span className="text-xs text-gray-400 font-bold">
                        Outstanding Receivables
                      </span>
                      <h4 className="text-3xl font-bold text-amber-500">
                        $
                        {invoices
                          .filter((i) => i.status === "Pending")
                          .reduce((sum, i) => sum + Number(i.amount), 0)
                          .toLocaleString()}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-1">
                        Awaiting co-pay / client claims processing
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center select-none">
                      <h3 className="text-sm font-bold text-gray-900 font-sans">
                        Billing Ledger
                      </h3>
                      <span className="text-xs text-gray-400 font-bold uppercase">
                        {filteredInvoices.length} Invoices
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase border-b border-gray-100 select-none">
                          <tr>
                            <th className="px-6 py-3.5">Invoice ID</th>
                            <th className="px-6 py-3.5">Patient Name</th>
                            <th className="px-6 py-3.5">Date Created</th>
                            <th className="px-6 py-3.5">Status</th>
                            <th className="px-6 py-3.5 text-right">
                              Invoice Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {filteredInvoices.length === 0 ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-6 py-12 text-center text-gray-400 font-medium select-none"
                              >
                                No billing records discovered.
                              </td>
                            </tr>
                          ) : (
                            filteredInvoices.map((inv) => (
                              <tr
                                key={inv.id}
                                className="hover:bg-gray-50/50 transition-colors"
                              >
                                <td className="px-6 py-4 font-semibold text-gray-900">
                                  {inv.id}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900">
                                  {inv.patientName}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-500">
                                  {inv.date}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                      inv.status === "Paid"
                                        ? "bg-emerald-50 text-secondary"
                                        : "bg-amber-50 text-amber-600"
                                    }`}
                                  >
                                    {inv.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right font-extrabold text-primary">
                                  ${Number(inv.amount).toFixed(2)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: MESSAGES */}
              {activeTab === "messages" && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center select-none">
                    <h3 className="text-sm font-bold text-gray-900 font-sans">
                      Patient Inquiries Feed
                    </h3>
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      {messages.length} Correspondence
                    </span>
                  </div>

                  <div className="flex flex-col divide-y divide-gray-100">
                    {messages.length === 0 ? (
                      <p className="p-12 text-center text-gray-400 font-medium font-sans select-none">
                        No contact messages registered.
                      </p>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col gap-3"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div className="flex gap-2.5 items-center">
                              <h4 className="font-bold text-gray-900 text-sm">
                                {msg.firstName} {msg.lastName}
                              </h4>
                              <span className="text-xs text-gray-400 font-medium">
                                ({msg.email})
                              </span>
                              <span
                                className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                  msg.inquiryType === "Book Appointment"
                                    ? "bg-blue-50 text-primary"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {msg.inquiryType}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  msg.status === "Unread"
                                    ? "bg-red-50 text-red-500"
                                    : "bg-emerald-50 text-secondary"
                                }`}
                              >
                                {msg.status}
                              </span>
                              {msg.status === "Unread" && (
                                <button
                                  onClick={() =>
                                    handleUpdateMessageStatus(msg.id, "Read")
                                  }
                                  className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                                >
                                  Mark as Read
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans bg-gray-50/50 border border-gray-100 p-4 rounded-xl">
                            {msg.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {activeTab === "settings" && (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6 animate-fade-in select-none">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base font-sans">
                      Clinic Workspace Settings
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 font-sans">
                      Simulate clinical database architectures, rules, and
                      system setups.
                    </p>
                  </div>

                  <div className="h-[1px] bg-gray-100" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Simulated Relational Schema
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Although this workspace sandboxes its databases inside
                        Express memory nodes for 100% execution safety, we model
                        full relational constraints.
                      </p>
                      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-[10px] flex flex-col gap-1 overflow-x-auto">
                        <span>CREATE TABLE appointments (</span>
                        <span className="pl-4">
                          id VARCHAR(255) PRIMARY KEY,
                        </span>
                        <span className="pl-4">
                          patient_id VARCHAR(255) REFERENCES patients(id),
                        </span>
                        <span className="pl-4">service_id VARCHAR(255),</span>
                        <span className="pl-4">
                          date DATE, time VARCHAR(50),
                        </span>
                        <span className="pl-4">
                          status ENUM('Pending', 'Confirmed', 'Completed',
                          'Cancelled')
                        </span>
                        <span>);</span>
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Database Reset Protocol
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Re-initialize server parameters to delete simulated
                        diagnostic files and recover original clinical presets.
                      </p>
                      <button
                        onClick={async () => {
                          await fetchData();
                        }}
                        className="w-fit bg-slate-900 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                        Trigger Master Sync
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* MANUAL APPOINTMENT MODAL */}
      {isNewAppointmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl animate-scale-up relative">
            <button
              onClick={() => setIsNewAppointmentOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b border-gray-100 select-none">
              <h3 className="font-bold text-gray-900 text-base font-sans">
                Book Manual Appointment
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 font-sans">
                Add a walkthrough patient file or manual clinical session.
              </p>
            </div>

            <form
              onSubmit={handleManualBooking}
              className="p-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Eleanor James"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 234-5678"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                    Recovery Path *
                  </label>
                  <select
                    value={newServiceId}
                    onChange={(e) => setNewServiceId(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans bg-white"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (${s.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                    Treatment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                    Time Slot *
                  </label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans bg-white"
                  >
                    <option>09:00 AM</option>
                    <option>09:45 AM</option>
                    <option>10:30 AM</option>
                    <option>11:15 AM</option>
                    <option>01:00 PM</option>
                    <option>02:30 PM</option>
                    <option>03:15 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase font-sans">
                  Condition / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Additional patient notes..."
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-sans resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsNewAppointmentOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
