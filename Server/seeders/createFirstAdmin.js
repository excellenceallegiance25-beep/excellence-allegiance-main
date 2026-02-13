const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createFirstAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'employee_management'
    });
    
    console.log('📦 Connected to MongoDB');

    // Check if any admin exists
    const existingAdmin = await User.findOne({ 
      role: { $in: ['admin', 'super_admin'] } 
    });
    
    if (existingAdmin) {
      console.log('\n=================================');
      console.log('✅ Admin already exists!');
      console.log('=================================');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Username:', existingAdmin.username);
      console.log('👑 Role:', existingAdmin.role);
      console.log('📅 Created:', existingAdmin.createdAt);
      console.log('=================================\n');
      
      await mongoose.disconnect();
      return;
    }

    // Check if any user exists
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      console.log('\n⚠️  Users exist but no admin found!');
      console.log('Please make an existing user admin through database\n');
      
      await mongoose.disconnect();
      return;
    }

    // Create first admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    const admin = await User.create({
      fullName: 'Super Administrator',
      email: 'admin@company.com',
      employeeId: 'ADMIN001',
      department: 'Administration',
      position: 'System Administrator',
      username: 'admin',
      password: hashedPassword,
      role: 'super_admin',
      status: 'active',
      isApproved: true,
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      approvedAt: new Date(),
      profile: {
        bio: 'System Administrator',
        skills: ['Administration', 'Management', 'Leadership']
      }
    });

    console.log('\n=================================');
    console.log('🎉🎉🎉 SUPER ADMIN CREATED! 🎉🎉🎉');
    console.log('=================================');
    console.log('📧 Email: admin@company.com');
    console.log('🔑 Password: Admin@123');
    console.log('👤 Username: admin');
    console.log('👑 Role: Super Admin');
    console.log('🆔 ID:', admin._id);
    console.log('=================================\n');
    console.log('⚠️  IMPORTANT: Change password after first login!\n');

    await mongoose.disconnect();
    console.log('📦 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error creating admin:', error);
    await mongoose.disconnect();
  }
};

// Run seeder
createFirstAdmin();