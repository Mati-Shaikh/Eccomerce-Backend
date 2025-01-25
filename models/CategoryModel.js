const db = require('../db'); // Replace with your DB connection file

const Category = {
  getAllCategories: async () => {
    try {
      const [results] = await db.query('SELECT * FROM categories');
      return results;
    } catch (err) {
      throw err;
    }
  },

  addCategory: async (name, parentId = null) => {
    try {
      const [result] = await db.query(
        'INSERT INTO categories (name, parent_id) VALUES (?, ?)',
        [name, parentId]
      );
      return result;
    } catch (err) {
      throw err;
    }
  },

  getCategoryTree: async () => {
    try {
      const [categories] = await db.query('SELECT * FROM categories');

      const buildTree = (parentId = null) => {
        return categories
          .filter((category) => category.parent_id === parentId)
          .map((category) => ({
            ...category,
            subcategories: buildTree(category.id),
          }));
      };

      return buildTree();
    } catch (err) {
      throw err;
    }
  },

  getSubcategories: async (parentId) => {
    try {
      const [results] = await db.query(
        'SELECT * FROM categories WHERE parent_id = ?',
        [parentId]
      );
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Category;
