import React, { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";

export default function PatientPanelView({ setView }) {
  const { data: session, status } = useSession();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(null);

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
      });
      
      if (res.ok) {
        // Refresh dashboard after payment
        fetchDashboard(session.user.id);
      } else {
        alert("Payment simulation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing payment.");
    } finally {
      setPaymentProcessing(null);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (!session || session.user.role !== "patient") {
    return <div className="p-8 text-center text-red-500">Access denied.</div>;
  }

  const patient = session.user;

  return (
    <div className="p-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">Welcome, {patient.name}</h1>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition font-semibold">Logout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appointments */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Your Appointments</h2>
          {dashboard?.appointments?.length === 0 ? (
            <p className="text-gray-500">No appointments found.</p>
          ) : (
            <ul className="space-y-4">
              {dashboard?.appointments?.map(apt => (
                <li key={apt.id} className="border p-4 rounded bg-gray-50 flex justify-between items-center shadow-sm">
                  <div>
                    <div className="font-semibold text-lg text-blue-900">{apt.serviceName}</div>
                    <div className="text-gray-600 text-sm">{new Date(apt.date).toLocaleDateString()} at {apt.time}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    apt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apt.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Your Invoices</h2>
          {dashboard?.invoices?.length === 0 ? (
            <p className="text-gray-500">No invoices found.</p>
          ) : (
            <ul className="space-y-4">
              {dashboard?.invoices?.map(inv => (
                <li key={inv.id} className="border p-4 rounded bg-gray-50 flex justify-between items-center shadow-sm">
                  <div>
                    <div className="font-semibold text-gray-800">{inv.serviceName}</div>
                    <div className="text-gray-600 text-sm">Amount: ${inv.amount} | Date: {inv.date}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inv.status}
                    </span>
                    {inv.status === 'Pending' && (
                      <button 
                        onClick={() => handlePayment(inv.id)}
                        disabled={paymentProcessing === inv.id}
                        className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-sm disabled:opacity-70 flex items-center gap-1"
                      >
                        {paymentProcessing === inv.id ? "Processing..." : "Pay Now"}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
