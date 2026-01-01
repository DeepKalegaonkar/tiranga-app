const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// One-time setup route to create super admin
// Visit this URL once after deployment, then remove or disable this route
router.post('/create-admin', async (req, res) => {
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
});

module.exports = router;
