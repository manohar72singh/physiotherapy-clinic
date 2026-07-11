import React, { useState } from 'react';

export default function PatientPanelView({ setView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [patient, setPatient] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setPatient(data.patient);
        fetchDashboard(data.patient.id);
        setError('');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  const fetchDashboard = async (id) => {
    try {
      const res = await fetch(`/api/patient/${id}/dashboard`);
      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Patient Login</h2>
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500" required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500" placeholder="Default is password123" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">Welcome, {patient.name}</h1>
        <button onClick={() => setPatient(null)} className="text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition font-semibold">Logout</button>
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
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inv.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
