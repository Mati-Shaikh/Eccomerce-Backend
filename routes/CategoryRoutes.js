const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addCategory,
  getCategoryTree,
  getSubcategories,
} = require('../Controllers/CategoryController');

// Get all categories
router.get('/categories', getAllCategories);

// Add a category
router.post('/categories', addCategory);

// Get the category tree
router.get('/categories/tree', getCategoryTree);

// Get subcategories of a specific category
router.get('/categories/:parentId/subcategories', getSubcategories);

module.exports = router;
