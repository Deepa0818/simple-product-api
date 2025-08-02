require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Product API!');
});

// GET all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST create new product
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.json(saved);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
