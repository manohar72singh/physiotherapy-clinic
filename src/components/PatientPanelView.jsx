import React, { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { Calendar, CreditCard, LogOut, Loader2, CheckCircle2 } from "lucide-react";

export default function PatientPanelView({ setView }) {
  const { data: session, status } = useSession();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboard(session.user.id);
    }
  }, [session]);

  const fetchDashboard = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/patient/${id}/dashboard`);
      if (res.ok) {
        const data = await res.json();
        setDashboard(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (invoiceId) => {
    setPaymentProcessing(invoiceId);
    try {
      // Simulate network delay for payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
      });
      
      if (res.ok) {
        setPaymentSuccess(invoiceId);
        setTimeout(() => {
          setPaymentSuccess(null);
          fetchDashboard(session.user.id);
        }, 2000);
      } else {
        alert("Payment simulation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing payment.");
    } finally {
      if(!paymentSuccess) setPaymentProcessing(null);
    }
  };

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  if (!session || session.user.role !== "patient") {
    return <div className="p-8 text-center text-red-500 font-bold">Access denied.</div>;
  }

  const patient = session.user;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full bg-surface min-h-screen font-sans">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-12 mb-10 shadow-sm border border-primary/10 animate-fade-in-up bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/50 to-emerald-50/50 z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-accent font-bold mb-1 uppercase tracking-wider text-sm">{getGreeting()},</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              {patient.name}
            </h1>
            <p className="text-slate-600 font-medium mt-2">Here is an overview of your recovery journey.</p>
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: "/" })} 
            className="flex items-center gap-2 text-sm bg-white text-primary border border-primary/10 shadow-sm px-5 py-2.5 rounded-full hover:bg-primary-light transition-colors font-bold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Appointments Column */}
        <div className="flex flex-col gap-6 animate-fade-in-up animate-delay-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-primary">Your Appointments</h2>
          </div>

          {loading ? (
             // Skeleton Loader
             Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
             ))
          ) : dashboard?.appointments?.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No upcoming appointments.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {dashboard?.appointments?.map(apt => (
                <div key={apt.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    apt.status === 'Confirmed' ? 'bg-emerald-400' :
                    apt.status === 'Completed' ? 'bg-blue-400' :
                    apt.status === 'Cancelled' ? 'bg-red-400' : 'bg-yellow-400'
                  }`}></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-primary mb-1">{apt.serviceName}</h3>
                      <p className="text-text-muted font-medium">
                        {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {apt.time}
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${
                      apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' :
                      apt.status === 'Completed' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' :
                      apt.status === 'Cancelled' ? 'bg-red-50 text-red-700 ring-1 ring-red-200' : 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Invoices Column */}
        <div className="flex flex-col gap-6 animate-fade-in-up animate-delay-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-primary">Your Invoices</h2>
          </div>

          {loading ? (
             // Skeleton Loader
             Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
             ))
          ) : dashboard?.invoices?.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No invoices found.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {dashboard?.invoices?.map(inv => (
                <div key={inv.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-primary">{inv.serviceName}</h3>
                    <p className="text-gray-500 text-sm mt-1">Invoice #{inv.id.toString().padStart(4, '0')} • {new Date(inv.date).toLocaleDateString()}</p>
                    <p className="text-2xl font-extrabold text-primary mt-2">${inv.amount}</p>
                  </div>
                  
                  <div className="flex flex-col items-start sm:items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inv.status}
                    </span>
                    
                    {inv.status === 'Pending' && (
                      <button 
                        onClick={() => handlePayment(inv.id)}
                        disabled={paymentProcessing === inv.id || paymentSuccess === inv.id}
                        className={`w-full sm:w-auto relative overflow-hidden text-sm px-6 py-2.5 rounded-full transition-all font-bold shadow-md flex items-center justify-center gap-2 ${
                           paymentSuccess === inv.id ? "bg-emerald-500 text-white" :
                           "bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                      >
                        {paymentProcessing === inv.id && !paymentSuccess && <Loader2 className="w-4 h-4 animate-spin" />}
                        {paymentSuccess === inv.id && <CheckCircle2 className="w-4 h-4 animate-bounce" />}
                        {paymentSuccess === inv.id ? "Paid Successfully" : 
                         paymentProcessing === inv.id ? "Processing..." : "Pay Now"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
