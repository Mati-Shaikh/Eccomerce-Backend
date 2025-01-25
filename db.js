const mysql = require('mysql2/promise'); // Use the promise version of mysql2

// Create a connection pool using your MySQL Workbench details
const db = mysql.createPool({
  host: '127.0.0.1',       
  user: 'root',            
  password: 'mati1234',   
  database: 'AddressDB',        
  port: 3306               
});

// Test the connection pool
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL database successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
  }
}

testConnection();

module.exports = db;
