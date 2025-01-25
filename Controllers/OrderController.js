const OrderModel = require("../models/OrderModel");

// Create a new order

// Create a new order
const addOrder = async (req, res) => {
    const { customer_name, customer_email, customer_phone, customer_address, products, total_price } = req.body;
  
    // Validate inputs
    if (!customer_name || !customer_email || !customer_phone || !customer_address || !products || !total_price) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
  
    try {
      // Add the order details to the orders table
      const orderData = { customer_name, customer_email, customer_phone, customer_address, total_price };
      const orderResult = await OrderModel.addOrder(orderData);
      const orderId = orderResult.insertId;
  
      // Insert each product into the order_products table
      for (const product of products) {
        await OrderModel.addProductToOrder(orderId, product.product_id, product.quantity);
      }
  
      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (err) {
      console.error('Error inserting order:', err);
      res.status(500).json({ message: 'Error inserting order' });
    }
  };
// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const results = await OrderModel.getAllOrders();
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const result = await OrderModel.getOrderById(orderId);

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Error fetching order" });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
};
