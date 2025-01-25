const db = require("../db"); // Import database connection

// Add a new product
const addProduct = async (productData) => {
  const { name, price, description, size, category_id } = productData;

  const query = `
    INSERT INTO products (name, price, description, size, category_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  try {
    const [result] = await db.execute(query, [name, price, description, size, category_id]);
    return result; // Return the result of the insert operation
  } catch (err) {
    throw new Error('Error inserting product: ' + err.message);
  }
};

// Add multiple images for a product
const addProductImages = async (productId, images) => {
  const query = `
    INSERT INTO product_images (product_id, image_url)
    VALUES ?
  `;
  
  // Map images array to the required structure for multiple insert
  const values = images.map((url) => [productId, url]);

  try {
    // Execute query to insert multiple images into the product_images table
    await db.query(query, [values]);
  } catch (err) {
    throw new Error('Error inserting product images: ' + err.message);
  }
};

// Fetch all products with their categories and images
const getAllProducts = async () => {
  const query = `
    SELECT p.id, p.name, p.price, p.description, p.size, c.name AS category, 
      GROUP_CONCAT(pi.image_url) AS images
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    GROUP BY p.id
  `;
  
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    throw new Error('Error fetching products: ' + err.message);
  }
};

// Fetch a single product by ID
const getProductById = async (productId) => {
  const query = `
    SELECT p.id, p.name, p.price, p.description, p.size, c.name AS category, 
      GROUP_CONCAT(pi.image_url) AS images
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE p.id = ?
    GROUP BY p.id
  `;
  
  try {
    const [rows] = await db.execute(query, [productId]);
    return rows[0]; // Return the first result (product)
  } catch (err) {
    throw new Error('Error fetching product by ID: ' + err.message);
  }
};

// Update a product
const updateProduct = async (productId, productData) => {
  const { name, price, description, size, category_id } = productData;

  const query = `
    UPDATE products
    SET name = ?, price = ?, description = ?, size = ?, category_id = ?
    WHERE id = ?
  `;
  
  try {
    await db.execute(query, [name, price, description, size, category_id, productId]);
  } catch (err) {
    throw new Error('Error updating product: ' + err.message);
  }
};

// Delete a product
const deleteProduct = async (productId) => {
  const query = `
    DELETE FROM products
    WHERE id = ?
  `;
  
  try {
    await db.execute(query, [productId]);
  } catch (err) {
    throw new Error('Error deleting product: ' + err.message);
  }
};

module.exports = {
  addProduct,
  addProductImages,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
