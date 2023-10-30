const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Connecting to database
const query = 'mongodb+srv://admin:admin123@user_management.gjtkogm.mongodb.net/Users?retryWrites=true&w=majority'
async function connectToDatabase() {
  try {
    await mongoose.connect(query, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

connectToDatabase();

module.exports = router;

