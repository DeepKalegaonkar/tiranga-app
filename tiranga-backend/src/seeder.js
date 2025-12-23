const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create initial super admin
const createSuperAdmin = async () => {
  try {
    // Check if super admin already exists
    const existingAdmin = await Admin.findOne({ role: 'super-admin' });

    if (existingAdmin) {
      console.log('❌ Super admin already exists');
      console.log('Email:', existingAdmin.email);
      process.exit();
    }

    // Create super admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@tirangagreenenergy.com',
      password: 'Admin@123456',
      role: 'super-admin'
    });

    console.log('✅ Super admin created successfully');
    console.log('====================================');
    console.log('Email:', admin.email);
    console.log('Password: Admin@123456');
    console.log('====================================');
    console.log('⚠️  IMPORTANT: Please change the password after first login!');

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Import sample data
const importData = async () => {
  try {
    // Sample enquiries
    const Enquiry = require('./models/Enquiry');
    const sampleEnquiries = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        message: 'Interested in residential solar installation',
        city: 'Pune',
        state: 'Maharashtra',
        serviceType: 'residential',
        source: 'website'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        message: 'Need solar solution for my factory',
        city: 'Mumbai',
        state: 'Maharashtra',
        serviceType: 'industrial',
        source: 'chatbot'
      }
    ];

    await Enquiry.insertMany(sampleEnquiries);
    console.log('✅ Sample enquiries imported');

    // Sample testimonials
    const Testimonial = require('./models/Testimonial');
    const sampleTestimonials = [
      {
        name: 'Amit Patel',
        designation: 'Homeowner',
        location: 'Pune',
        comment: 'Excellent service! The solar installation was seamless and professional.',
        rating: 5,
        isApproved: true
      },
      {
        name: 'Sunita Desai',
        designation: 'Business Owner',
        company: 'Tech Solutions Pvt Ltd',
        location: 'Mumbai',
        comment: 'Great ROI on our solar investment. Highly recommended!',
        rating: 5,
        isApproved: true
      }
    ];

    await Testimonial.insertMany(sampleTestimonials);
    console.log('✅ Sample testimonials imported');

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Admin.deleteMany();
    await require('./models/Enquiry').deleteMany();
    await require('./models/Testimonial').deleteMany();

    console.log('✅ All data deleted');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-c' || process.argv[2] === '--create') {
  createSuperAdmin();
} else if (process.argv[2] === '-i' || process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '-d' || process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please use one of the following flags:');
  console.log('-c or --create : Create super admin');
  console.log('-i or --import : Import sample data');
  console.log('-d or --delete : Delete all data');
  process.exit();
}
