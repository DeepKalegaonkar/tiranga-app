const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// One-time setup route to create super admin
// Visit this URL once after deployment, then remove or disable this route
const createAdminHandler = async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@tirangagreenenergy.com' });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Super admin already exists'
      });
    }

    // Create super admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@tirangagreenenergy.com',
      password: 'Admin@123456',
      role: 'super-admin',
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Super admin created successfully',
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// Test database connection
router.get('/test-db', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const status = mongoose.connection.readyState;
    const statusMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    res.json({
      success: true,
      database: statusMap[status],
      connection: mongoose.connection.host || 'no host'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Support both GET and POST for convenience
router.get('/create-admin', createAdminHandler);
router.post('/create-admin', createAdminHandler);

module.exports = router;
