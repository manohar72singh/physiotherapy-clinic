# Zenith Physiotherapy

Zenith Physiotherapy is a modern, premium web application built for a professional physical therapy clinic. It features a complete patient-facing website, a secure Patient Portal for tracking recovery journeys, and a comprehensive Admin Portal for managing appointments, patients, and invoicing.

## 🌟 Key Features

- **Marketing Website:** A stunning, cinematic landing page featuring dynamic glassmorphism and modern Light & Clinical aesthetic.
- **Patient Portal:** A secure dashboard where patients can view their upcoming appointments, track their recovery progress, and securely pay their invoices.
- **Admin Control Center:** A comprehensive suite for administrators to manage daily clinic operations, including appointment scheduling, patient records, financial statistics, and messaging.
- **Email Automation:** Built-in automated email functionality for booking confirmations and general inquiries using Nodemailer.
- **Secure Authentication:** Role-based access control (Admin vs. Patient) using NextAuth.js.

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 (Custom Glassmorphism utilities, Outfit Font)
- **Database:** MySQL
- **Authentication:** NextAuth.js (Credentials Provider)
- **Email:** Nodemailer (SMTP Integration)
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL Server (Running locally or remote)

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```


### 2. Run the Development Server

Start the application locally:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🔒 Portals Access

- **Main Website:** `http://localhost:3000/`
- **Patient Login:** `http://localhost:3000/login`
- **Admin Dashboard:** `http://localhost:3000/login?role=admin`

*(Note: Ensure your MySQL database is seeded with valid user credentials to access the portals).*

---
*Developed for Zenith Physiotherapy Clinics.*
