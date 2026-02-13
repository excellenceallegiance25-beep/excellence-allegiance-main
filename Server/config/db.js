const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'employee_management',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    
    // Create indexes
    await conn.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    await conn.connection.collection('users').createIndex({ employeeId: 1 }, { unique: true });
    await conn.connection.collection('users').createIndex({ username: 1 }, { unique: true });
    
    console.log('✅ Database indexes created');
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;