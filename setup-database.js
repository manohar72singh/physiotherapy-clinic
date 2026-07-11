import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

async function setupDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'zenith_physio';

  console.log(`Connecting to MySQL server at ${host}...`);
  try {
    const connection = await mysql.createConnection({ host, user, password });
    
    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    console.log(`Database '${database}' created or already exists.`);
    
    // Use the database
    await connection.changeUser({ database });

    // Create Patients table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        condition_desc VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        lastVisit VARCHAR(50),
        totalAppointments INT DEFAULT 0
      )
    `);

    // Create Services table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        duration INT,
        price DECIMAL(10,2),
        iconName VARCHAR(50)
      )
    `);

    // Create Appointments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id VARCHAR(50) PRIMARY KEY,
        patientId VARCHAR(50),
        patientName VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        serviceId VARCHAR(50),
        serviceName VARCHAR(255),
        date VARCHAR(50),
        time VARCHAR(50),
        status VARCHAR(50),
        condition_desc VARCHAR(255),
        createdAt DATETIME,
        FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE SET NULL
      )
    `);

    // Create Invoices table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(50) PRIMARY KEY,
        appointmentId VARCHAR(50),
        patientName VARCHAR(255),
        amount DECIMAL(10,2),
        status VARCHAR(50),
        date VARCHAR(50),
        FOREIGN KEY (appointmentId) REFERENCES appointments(id) ON DELETE CASCADE
      )
    `);

    // Create Contact Messages table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id VARCHAR(50) PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(255),
        inquiryType VARCHAR(100),
        message TEXT,
        status VARCHAR(50),
        createdAt DATETIME
      )
    `);

    console.log("Tables created successfully.");

    // Check if services are seeded
    const [services] = await connection.query("SELECT * FROM services");
    if (services.length === 0) {
      console.log("Seeding initial services...");
      const insertService = "INSERT INTO services (id, name, description, duration, price, iconName) VALUES (?, ?, ?, ?, ?, ?)";
      await connection.query(insertService, ['sports-rehab', 'Sports Rehab', 'Accelerate recovery from athletic injuries with tailored kinesiology and functional movement therapies.', 45, 120.00, 'directions_run']);
      await connection.query(insertService, ['post-op-care', 'Post-Op Care', 'Guided recovery protocols post-surgery to restore mobility, reduce scar tissue, and manage pain effectively.', 60, 135.00, 'healing']);
      await connection.query(insertService, ['neurological-physio', 'Neurological Physio', 'Specialized treatments to improve function and quality of life for individuals with neurological conditions.', 60, 150.00, 'psychology']);
      console.log("Services seeded.");
    }

    // Optionally seed a test patient
    const [patients] = await connection.query("SELECT * FROM patients WHERE email = 'test@example.com'");
    if (patients.length === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await connection.query(`
        INSERT INTO patients (id, name, email, phone, condition_desc, password, lastVisit, totalAppointments) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, ['PT-TEST', 'Test Patient', 'test@example.com', '1234567890', 'General Checkup', hashedPassword, 'Never', 0]);
      console.log("Test patient seeded: test@example.com / password123");
    }

    await connection.end();
    console.log("Database setup completed successfully.");
    
  } catch (error) {
    console.error("Database setup failed:", error);
  }
}

setupDatabase();
