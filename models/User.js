// models/User.js
const db = require('../db');  // Use the db pool from db.js

class User {
  static async create(userData) {
    const connection = await db.getConnection();  // Get a connection from the pool
    try {
      const [result] = await connection.execute(
        'INSERT INTO Users (name, email, phone) VALUES (?, ?, ?)',
        [userData.name, userData.email, userData.phone]
      );
      return result.insertId;
    } finally {
      connection.release();  // Release the connection back to the pool
    }
  }
}

module.exports = User;
