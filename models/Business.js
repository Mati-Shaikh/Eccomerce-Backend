// models/Business.js
const db = require('../db');  // Use the db pool from db.js

class Business {
  static async create(businessData) {
    const connection = await db.getConnection();  // Get a connection from the pool
    try {
      await connection.beginTransaction();

      // Create business record
      const [businessResult] = await connection.execute(
        'INSERT INTO Businesses (user_id, shop_name, business_title, description, business_type) VALUES (?, ?, ?, ?, ?)',
        [
          businessData.userId,  // Use userId from the passed data
          businessData.shopName,
          businessData.businessTitle,
          businessData.description,
          businessData.businessType
        ]
      );

      // Create address record
      const [addressResult] = await connection.execute(
        'INSERT INTO Addresses (business_id, country, city, street, coordinates) VALUES (?, ?, ?, ?, ?)',
        [
          businessResult.insertId,
          businessData.address.country,
          businessData.address.city,
          businessData.address.street,
          JSON.stringify(businessData.address.coordinates)
        ]
      );

      await connection.commit();
      
      return {
        businessId: businessResult.insertId,
        addressId: addressResult.insertId
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();  // Release the connection back to the pool
    }
  }
}

module.exports = Business;
