const db = require("../db"); // Import database connection

// Add a new order

// Add a new order
const addOrder = async (orderData) => {
    const { customer_name, customer_email, customer_phone, customer_address, total_price } = orderData;
  
    const query = `
      INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_price)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    try {
      const [result] = await db.execute(query, [customer_name, customer_email, customer_phone, customer_address, total_price]);
      return result; // Return the result of the insert operation
    } catch (err) {
      throw new Error('Error inserting order: ' + err.message);
    }
  };
  
  // Add products to the order
  const addProductToOrder = async (orderId, productId, quantity) => {
    const query = `
      INSERT INTO order_products (order_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
  
    try {
      await db.execute(query, [orderId, productId, quantity]);
    } catch (err) {
      throw new Error('Error adding product to order: ' + err.message);
    }
  };
  

// Fetch all orders
const getAllOrders = async () => {
  const query = `
    SELECT o.id, o.product_id, o.name, o.address, o.phone, o.email, o.total_bill, p.name AS product_name
    FROM orders o
    JOIN products p ON o.product_id = p.id
  `;

  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    throw new Error('Error fetching orders: ' + err.message);
  }
};

// Fetch a single order by ID
const getOrderById = async (orderId) => {
  const query = `
    SELECT o.id, o.product_id, o.name, o.address, o.phone, o.email, o.total_bill, p.name AS product_name
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE o.id = ?
  `;

  try {
    const [rows] = await db.execute(query, [orderId]);
    return rows[0]; // Return the first result (order)
  } catch (err) {
    throw new Error('Error fetching order by ID: ' + err.message);
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  addProductToOrder
};
