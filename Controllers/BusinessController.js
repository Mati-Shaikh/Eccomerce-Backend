// controllers/businessController.js
const User = require('../models/User');
const Business = require('../models/Business');

const businessController = {
  async register(req, res) {
    try {
      // Validate input
      if (!req.body.email || !req.body.name || !req.body.phone) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      console.log(User);  // Debug log
      console.log(Business);  // Debug log

      // Create user first
      const userId = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      });

      // Create business with address
      const businessResult = await Business.create({
        shopName: req.body.shopName,
        businessTitle: req.body.businessTitle,
        description: req.body.description,
        businessType: req.body.businessType,
        address: {
          country: req.body.address.country,
          city: req.body.address.city,
          street: req.body.address.street,
          coordinates: req.body.address.coordinates
        },
        userId  // Include userId here
      });

      res.status(201).json({
        message: 'Business registered successfully',
        userId,
        businessId: businessResult.businessId
      });

    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = businessController;
