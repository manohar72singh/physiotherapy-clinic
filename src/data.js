export const SERVICES = [
  {
    id: "sports-rehab",
    name: "Sports Rehab",
    description:
      "Accelerate recovery from athletic injuries with tailored kinesiology and functional movement therapies.",
    duration: 45,
    price: 120,
    iconName: "directions_run",
  },
  {
    id: "post-op-care",
    name: "Post-Op Care",
    description:
      "Guided recovery protocols post-surgery to restore mobility, reduce scar tissue, and manage pain effectively.",
    duration: 60,
    price: 135,
    iconName: "healing",
  },
  {
    id: "neurological-physio",
    name: "Neurological Physio",
    description:
      "Specialized treatments to improve function and quality of life for individuals with neurological conditions.",
    duration: 60,
    price: 150,
    iconName: "psychology",
  },
];

export const INITIAL_PATIENTS = [
  {
    id: "PT-8492",
    name: "Eleanor James",
    email: "eleanor.james@example.com",
    phone: "+1 (555) 234-5678",
    condition: "Post-Op Rehab",
    lastVisit: "Oct 24, 2023",
    totalAppointments: 4,
  },
  {
    id: "PT-8493",
    name: "Marcus Reed",
    email: "marcus.reed@example.com",
    phone: "+1 (555) 345-6789",
    condition: "Sports Injury",
    lastVisit: "Oct 24, 2023",
    totalAppointments: 2,
  },
  {
    id: "PT-8494",
    name: "Sarah Lin",
    email: "sarah.lin@example.com",
    phone: "+1 (555) 456-7890",
    condition: "Chronic Back Pain",
    lastVisit: "Oct 23, 2023",
    totalAppointments: 6,
  },
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-8492",
    patientId: "PT-8492",
    patientName: "Eleanor James",
    email: "eleanor.james@example.com",
    phone: "+1 (555) 234-5678",
    serviceId: "post-op-care",
    serviceName: "Post-Op Rehab",
    date: "2024-09-10",
    time: "09:00 AM",
    status: "Confirmed",
    condition: "Post-Op Rehab",
    createdAt: "2024-09-05T10:00:00Z",
  },
  {
    id: "APT-8493",
    patientId: "PT-8493",
    patientName: "Marcus Reed",
    email: "marcus.reed@example.com",
    phone: "+1 (555) 345-6789",
    serviceId: "sports-rehab",
    serviceName: "Sports Injury",
    date: "2024-09-10",
    time: "10:30 AM",
    status: "Confirmed",
    condition: "Sports Injury",
    createdAt: "2024-09-06T11:30:00Z",
  },
  {
    id: "APT-8494",
    patientId: "PT-8494",
    patientName: "Sarah Lin",
    email: "sarah.lin@example.com",
    phone: "+1 (555) 456-7890",
    serviceId: "neurological-physio",
    serviceName: "Chronic Back Pain",
    date: "2024-09-09",
    time: "02:30 PM",
    status: "Completed",
    condition: "Chronic Back Pain",
    createdAt: "2024-09-04T09:15:00Z",
  },
];

export const INITIAL_INVOICES = [
  {
    id: "INV-2048",
    appointmentId: "APT-8492",
    patientName: "Eleanor James",
    amount: 150.0,
    status: "Paid",
    date: "Oct 24, 2023",
  },
  {
    id: "INV-2049",
    appointmentId: "APT-8493",
    patientName: "Marcus Reed",
    amount: 200.0,
    status: "Pending",
    date: "Oct 24, 2023",
  },
  {
    id: "INV-2050",
    appointmentId: "APT-8494",
    patientName: "Sarah Lin",
    amount: 120.0,
    status: "Paid",
    date: "Oct 23, 2023",
  },
];

export const INITIAL_CONTACT_MESSAGES = [
  {
    id: "MSG-001",
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@example.com",
    inquiryType: "Book Appointment",
    message:
      "Hello, I wanted to inquire about booking a sports rehab session for my teenage son who has a sprained knee from soccer. Do you accept direct insurance billing?",
    status: "Unread",
    createdAt: "2024-09-09T14:35:00Z",
  },
  {
    id: "MSG-002",
    firstName: "Emma",
    lastName: "Watson",
    email: "emma.w@example.com",
    inquiryType: "General Inquiry",
    message:
      "Your clinic spaces look beautiful. Do you have physical therapists specialized in pediatric hypermobility disorders?",
    status: "Read",
    createdAt: "2024-09-08T11:20:00Z",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Dr. Anya Sharma",
    role: "Lead Physiotherapist",
    quote:
      "True healing begins when we understand not just the mechanics of the body, but the life our patients want to return to.",
    description:
      "Dr. Anya has over 12 years of experience in clinical physiotherapy. She holds a Doctorate in Physical Therapy and specializes in advanced biomechanical analysis.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYY51L50X4Ko93NbxE2dXSzbW6jQRjp_pNM8eeshrUiinD6NGkjMkFtZUCuetPomVvWiHJGlPLwfagghOGEmOZMrD6E3OyoqZ7D_-OuEc3o4QIAfCC_aRWQrRX265QCru5c-9cALJKnAJDdftQ0vqXajktJzk1Wdw_lMxQVQPm728Mm1NC8sBydNOxRAGC-k_Qo9cDWCj0tTOksz-XXA0xWGECfwwDty8_UFy9wM9HsTynPysSdUAZTiISHuh9PCuc9C4desMUla0",
  },
  {
    name: "James Chen",
    role: "Sports Rehabilitation Spec.",
    description:
      "Specializing in athletic performance and recovery, James has worked with professional sports teams to optimize movement and prevent injury.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2UO7iX_cTBg33rI5R13-UipohvXBwCBv3khkzWPDcBHoXrNVNSuDcuDwQOrJeE6MNKl5CilE3eBWimiFlD7Api9TZEUM0pdXrWMn2snwZfdaJJCPoCFpCsPCS09ZjSq_NjH-00Zzr03VMAoQ2jE94fA169QZVr-avM-pvinBJuHr0Uu9l33kioMtiVfRwLPdfz11zZ1oQsafZnHSWh-eQqsfayBkiAMHUafYTtsveOm2MpIgUiljJ7auz08gzkP_IC9Y1u3W7jmQ",
  },
  {
    name: "Sarah Jenkins",
    role: "Neurological Physiotherapy",
    description:
      "Sarah brings over 15 years of experience in neurological rehabilitation, helping patients regain independence after stroke or spinal injuries.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi61nchGbaXetzK_9KhAsPWA_E6-reUJwXRkImVExiu0Gm1UGe1-FIC8S-cbBDsCpTkNcDtvcpsEAE6XVpfPgnAg40AlvrgRgiGTOe_ce-2kOanuuzA9krWMvVExezDbaOJxM2QV1JacMnPHMFbofDlZWLAXmAQ6-R4dn9NyzOlZgGSs_SD9-SIaPpLGzJDvvbi2MxBQtVuiLDtxnVo3RDAYDQjfuu3F-asBQNZRvM_wGr257_43sJ2NVxs7yPvTjOu3E2aCkYhTw",
  },
  {
    name: "Marcus O'Neil",
    role: "Musculoskeletal Specialist",
    description:
      "Marcus is passionate about treating chronic back and neck pain using evidence-based manual therapy and targeted exercise programs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBi0-xvxe0aZHEDZq06pwf2S_p3rsF37h6qSzkqXO0I0FGnRb8Y2jU3uTYp_8KceuIxdOnTtwrqYl_EVW_hmIZ8Sr2xWHe8LbFWb1Jr8Qvdrjf8naS8nFhZYRytIjfSF58OkmcqaIJxZOEiy2k-frGflV3gus9NFH5OU4gwQtyMoxK4_tGwRrZDe-v2OvCXuKtWWsv3wSuIvHttFaHzfQ9q_PBb5Up_9vgaZPorBS6vfQ2ClMQJkvAY8FHVRym7QAAv6ltyLCeBTNA",
  },
];
