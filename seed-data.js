import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

dotenv.config();

const generateId = (prefix) => `${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

async function seedData() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'zenith_physio';

  try {
    const connection = await mysql.createConnection({ host, user, password, database });
    console.log("Connected to database. Starting seeding...");

    // Password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Seed Patients
    const patients = [
      { id: generateId('PT'), name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '9876543210', condition: 'Lower Back Pain' },
      { id: generateId('PT'), name: 'Priya Verma', email: 'priya.v@example.com', phone: '9876543211', condition: 'Post-ACL Surgery' },
      { id: generateId('PT'), name: 'Amit Kumar', email: 'amit.k@example.com', phone: '9876543212', condition: 'Frozen Shoulder' },
      { id: generateId('PT'), name: 'Neha Gupta', email: 'neha.g@example.com', phone: '9876543213', condition: 'Neck Stiffness' },
      { id: generateId('PT'), name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '9876543214', condition: 'Sports Injury - Ankle Sprain' },
    ];

    for (const p of patients) {
      await connection.query(`
        INSERT INTO patients (id, name, email, phone, condition_desc, password, lastVisit, totalAppointments) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name=name
      `, [p.id, p.name, p.email, p.phone, p.condition, hashedPassword, new Date().toISOString().split('T')[0], 3]);
    }
    console.log(`✅ Inserted ${patients.length} patients.`);

    // 2. Fetch Services
    const [services] = await connection.query("SELECT * FROM services");
    if (services.length === 0) {
      console.log("No services found. Run setup-database.js first.");
      process.exit(1);
    }

    // 3. Seed Appointments & Invoices
    let appointmentsCount = 0;
    const statuses = ['Confirmed', 'Completed', 'Cancelled', 'Pending'];
    const invoiceStatuses = ['Paid', 'Pending', 'Overdue'];

    for (const p of patients) {
      // Create 2-3 appointments per patient
      const numAppts = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < numAppts; i++) {
        const s = services[Math.floor(Math.random() * services.length)];
        const aptId = generateId('APT');
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Random date within last 30 days or next 7 days
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + (Math.floor(Math.random() * 37) - 30));
        const dateStr = dateObj.toISOString().split('T')[0];
        const timeStr = `${Math.floor(Math.random() * 8) + 9}:00 AM`;

        await connection.query(`
          INSERT INTO appointments (id, patientId, patientName, email, phone, serviceId, serviceName, date, time, status, condition_desc, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [aptId, p.id, p.name, p.email, p.phone, s.id, s.name, dateStr, timeStr, status, p.condition]);
        appointmentsCount++;

        // Create Invoice if completed or confirmed
        if (status === 'Completed' || status === 'Confirmed') {
          const invId = generateId('INV');
          const invStatus = invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)];
          await connection.query(`
            INSERT INTO invoices (id, appointmentId, patientName, amount, status, date)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [invId, aptId, p.name, s.price, invStatus, dateStr]);
        }
      }
    }
    console.log(`✅ Inserted ${appointmentsCount} appointments and their invoices.`);

    // 4. Seed Contact Messages
    const messages = [
      { fn: 'Rohan', ln: 'Das', email: 'rohan.d@gmail.com', type: 'General Inquiry', msg: 'What are your clinic hours on weekends?' },
      { fn: 'Megha', ln: 'Joshi', email: 'megha.j@gmail.com', type: 'Insurance', msg: 'Do you accept Star Health Insurance for post-op rehab?' },
      { fn: 'Karan', ln: 'Patel', email: 'karan.p@gmail.com', type: 'Booking Issue', msg: 'I am unable to book an appointment for tomorrow.' },
    ];

    for (const m of messages) {
      await connection.query(`
        INSERT INTO contact_messages (id, firstName, lastName, email, inquiryType, message, status, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, 'Unread', NOW())
      `, [generateId('MSG'), m.fn, m.ln, m.email, m.type, m.msg]);
    }
    console.log(`✅ Inserted ${messages.length} contact messages.`);

    await connection.end();
    console.log("🎉 Seeding complete! Admin panel will now look great.");
    
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seedData();
