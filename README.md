# Student Grading System - MVP

A structured MVP (Minimum Viable Product) student grading system with organized frontend/backend architecture, built with React.js frontend and Node.js backend, featuring MongoDB for data storage and Tailwind CSS for modern UI design.

## 📁 Project Structure

```
student-grading-system/
├── 📁 Frontend (React + Tailwind CSS)
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── services/           # API service layer
│   └── public/             # Static assets
├── 📁 Backend (Node.js + Express + MongoDB)
│   ├── routes/             # API route definitions
│   ├── models/             # Database models
│   ├── controllers/        # Business logic controllers
│   └── server.js           # Main server file
├── 📁 Shared (Common utilities)
│   ├── config/             # Configuration files
│   └── utils/              # Shared utility functions
└── 📄 Documentation
```

## 🚀 Features

### Admin Features
- **Student Management**: Add, edit, delete, and view student information
- **Course Management**: Manage courses, subjects, and teacher assignments
- **Grade Management**: Enter and update student grades with automatic grade calculation
- **Reports Generation**: Generate detailed reports for students, classes, and subjects
- **Dashboard Analytics**: View comprehensive statistics and charts

### Student Features
- **Student Dashboard**: View individual grades and performance metrics
- **Grade Visualization**: Interactive charts showing academic progress
- **Report Cards**: Detailed academic performance reports

### System Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization across the application
- **Data Validation**: Comprehensive form validation and error handling
- **Search & Filter**: Advanced filtering and search capabilities
- **Export Functionality**: Download reports in JSON format

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks and context API
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Recharts** - Data visualization and charts
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Express Validator** - Input validation middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd student-grading-system
```

### 2. Install All Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-grading-system
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
# Run as Administrator
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**If MongoDB is not installed:**
- Download from: https://www.mongodb.com/try/download/community
- Follow installation instructions for your OS

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Terminal 1: Start backend server
npm run dev

# Terminal 2: Start frontend
npm run frontend
```

#### Quick Start (All in one)
```bash
# Install everything
npm run install-all

# Start backend
npm run backend

# Start frontend (in another terminal)
npm run frontend
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
student-grading-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context for state management
│   │   ├── pages/          # Main application pages
│   │   └── App.js          # Main App component
│   ├── package.json
│   └── tailwind.config.js
├── models/                 # MongoDB models
│   ├── Student.js
│   ├── Course.js
│   └── Grade.js
├── controllers/           # Route controllers
│   ├── studentController.js
│   ├── courseController.js
│   ├── gradeController.js
│   └── reportController.js
├── routes/                # API routes
│   ├── studentRoutes.js
│   ├── courseRoutes.js
│   ├── gradeRoutes.js
│   └── reportRoutes.js
├── server.js              # Main server file
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/class/:class/:section` - Get students by class and section

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/class/:class/:section` - Get courses by class and section

### Grades
- `GET /api/grades` - Get all grades
- `GET /api/grades/student/:studentId` - Get grades by student
- `POST /api/grades` - Create/update grade
- `PUT /api/grades/:id` - Update grade
- `DELETE /api/grades/:id` - Delete grade
- `GET /api/grades/statistics` - Get grade statistics

### Reports
- `GET /api/reports/student/:studentId` - Generate student report card
- `GET /api/reports/class/:class/:section` - Generate class report
- `GET /api/reports/subject/:courseId` - Generate subject report

## 🎨 UI Components

### Main Pages
- **Dashboard**: Overview with statistics and charts
- **Students**: Student management with CRUD operations
- **Courses**: Course management and teacher assignments
- **Grades**: Grade entry and management system
- **Reports**: Report generation and download
- **Student Dashboard**: Individual student performance view

### Key Features
- **Responsive Tables**: Sortable and filterable data tables
- **Modal Forms**: Clean form interfaces for data entry
- **Interactive Charts**: Visual representation of data
- **Search & Filter**: Advanced filtering capabilities
- **Real-time Updates**: Live data synchronization

## 📊 Database Schema

### Student Model
```javascript
{
  name: String,
  email: String (unique),
  rollNumber: String (unique),
  class: String,
  section: String,
  dateOfBirth: Date,
  address: String,
  phoneNumber: String,
  parentName: String,
  parentPhone: String,
  isActive: Boolean
}
```

### Course Model
```javascript
{
  subject: String,
  courseCode: String (unique),
  teacher: String,
  teacherEmail: String,
  class: String,
  section: String,
  credits: Number,
  maxMarks: Number,
  passingMarks: Number,
  isActive: Boolean
}
```

### Grade Model
```javascript
{
  student: ObjectId (ref: Student),
  course: ObjectId (ref: Course),
  marks: Number,
  grade: String (A+, A, B+, B, C+, C, D, F),
  semester: String,
  academicYear: String,
  examType: String,
  remarks: String,
  gradedBy: String
}
```

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to GitHub repository
4. Enable automatic deployments

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-grading-system
JWT_SECRET=your_production_jwt_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Email notifications for grade updates
- [ ] Advanced analytics and insights
- [ ] Mobile application
- [ ] Integration with external systems
- [ ] Automated report scheduling
- [ ] Grade import/export functionality
- [ ] Parent portal access

---

**Built with ❤️ for educational institutions**
