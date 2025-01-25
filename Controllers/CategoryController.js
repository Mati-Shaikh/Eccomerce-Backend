const Category = require('../models/CategoryModel');

const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const results = await Category.getAllCategories();
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  addCategory: async (req, res) => {
    const { name, parentId } = req.body; // Accept `parentId` to add a subcategory.
    try {
      await Category.addCategory(name, parentId);
      res.status(201).json({ message: 'Category added successfully!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCategoryTree: async (req, res) => {
    try {
      const results = await Category.getCategoryTree();
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSubcategories: async (req, res) => {
    const { parentId } = req.params;
    try {
      const results = await Category.getSubcategories(parentId);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = CategoryController;
