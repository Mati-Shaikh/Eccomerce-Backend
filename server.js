const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const CategoryRoutes = require('./routes/CategoryRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const businessRoutes = require('./routes/BusinessRoutes');
const orderRoutes = require("./routes/OrderRoutes");

// Initialize app
const app = express();
app.use(express.json()); // For parsing application/json


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api', CategoryRoutes);
app.use('/api', ProductRoutes);
app.use('/api/business', businessRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/orders", orderRoutes);


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
