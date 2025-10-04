
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





