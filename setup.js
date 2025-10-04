const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Student Grading System...\n');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-grading-system
JWT_SECRET=your_jwt_secret_key_here`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

// Create client/src/index.css if it doesn't exist
const cssPath = path.join(__dirname, 'client/src/index.css');
if (!fs.existsSync(cssPath)) {
  console.log('⚠️  CSS file not found. Please run: cd client && npm install');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Install dependencies: npm install');
console.log('2. Install client dependencies: cd client && npm install');
console.log('3. Start MongoDB service');
console.log('4. Run development server: npm run dev');
console.log('5. In another terminal, run: npm run client');
console.log('\n🎉 Setup complete! Happy coding!');
