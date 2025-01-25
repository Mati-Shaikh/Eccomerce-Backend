const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/ProductController'); // Ensure this path is correct
const multer = require('multer');
const path = require('path');

// Configure multer to store files in a folder named 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the original file extension
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.'));
    }
  }
});


// Route to add a new product with images
// Use multer's upload middleware to handle image file uploads
router.post('/products', upload.array('images', 4), addProduct);

// Route to get all products
router.get('/products', getAllProducts);

// Route to get a single product by ID
router.get('/products/:id', getProductById);

// Route to update a product
router.patch('/products/:id', updateProduct);

// Route to delete a product
router.delete('/products/:id', deleteProduct);

module.exports = router;
