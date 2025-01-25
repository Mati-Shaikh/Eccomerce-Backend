const ProductModel = require("../models/ProductModel");
  // Add a new product with images (updated to handle file uploads)
  const addProduct = async (req, res) => {
    const { name, price, description, size, category_id } = req.body;
    const images = req.files ? req.files.map(file => file.path) : []; // Get image file paths
  
    // Validate inputs
    if (!name || !price || !category_id || images.length < 1 || images.length > 4) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
  
    const productData = { name, price, description, size, category_id };
  
    try {
      // Add product to database
      const productResult = await ProductModel.addProduct(productData);
  
      const productId = productResult.insertId;
  
      // Add product images
      if (images && images.length > 0) {
        await ProductModel.addProductImages(productId, images);
      }
  
      res.status(201).json({ message: 'Product created successfully', productId });
    } catch (err) {
      console.error('Error inserting product:', err);
      res.status(500).json({ message: 'Error inserting product' });
    }
  };
  
  
  
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const results = await ProductModel.getAllProducts();
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await ProductModel.getProductById(productId);

    if (!result.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
};const updateProduct = async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body to verify the data
    console.log('Request Files:', req.files); // Log the files (images) if any
  
    const productId = req.params.id;
    const { name, price, description, size, category_id } = req.body;
  
    const images = req.files ? req.files.map(file => file.path) : [];
  
    const productData = {};
    if (name) productData.name = name;
    if (price) productData.price = price;
    if (description) productData.description = description;
    if (size) productData.size = size;
    if (category_id) productData.category_id = category_id;
  
    if (Object.keys(productData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }
  
    try {
      await ProductModel.updateProduct(productId, productData);
  
      if (images.length > 0) {
        await ProductModel.updateProductImages(productId, images);
      }
  
      res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Error updating product", error: err.message });
    }
  };
  
  
  

// Delete a product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await ProductModel.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
