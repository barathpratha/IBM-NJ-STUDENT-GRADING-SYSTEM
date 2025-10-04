const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-grading-system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('💡 Please make sure MongoDB is running on your system');
    console.log('💡 You can start MongoDB with: net start MongoDB (as administrator)');
    console.log('💡 Or install MongoDB if not installed: https://www.mongodb.com/try/download/community');
    
    // Don't exit the process, let the server continue without database
    console.log('⚠️  Server will continue without database connection');
  }
};

module.exports = connectDB;
