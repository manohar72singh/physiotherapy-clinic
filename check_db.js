import db from './src/lib/db.js';

async function checkDb() {
  try {
    console.log("Testing database connection...");
    await db.query("SELECT 1");
    console.log("✅ Database connection successful!");

    console.log("Checking tables...");
    const [tables] = await db.query("SHOW TABLES");
    console.log("Tables found:", tables);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection or query failed:");
    console.error(error.message);
    process.exit(1);
  }
}

checkDb();
