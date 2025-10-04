import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import SubjectManagement from './components/SubjectManagement';
import GradeEntry from './components/GradeEntry';
import GradeResults from './components/GradeResults';
import StudentResults from './components/StudentResults';
import StudentSubjects from './components/StudentSubjects';
import StudentGrades from './components/StudentGrades';
import StudentReport from './components/StudentReport';
import ProtectedRoute from './components/ProtectedRoute';
import Students from './pages/Students';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      
      // Demo login - replace with actual API call
      const demoUsers = {
        'student@demo.com': { 
          id: 1, 
          username: 'student', 
          email: 'student@demo.com', 
          role: 'student', 
          fullName: 'John Student',
          profile: { firstName: 'John', lastName: 'Student', department: 'Computer Science', year: '3rd Year' }
        },
        'teacher@demo.com': { 
          id: 2, 
          username: 'teacher', 
          email: 'teacher@demo.com', 
          role: 'teacher', 
          fullName: 'Jane Teacher',
          profile: { firstName: 'Jane', lastName: 'Teacher', department: 'Computer Science' }
        },
        'admin@demo.com': { 
          id: 3, 
          username: 'admin', 
          email: 'admin@demo.com', 
          role: 'admin', 
          fullName: 'Admin User',
          profile: { firstName: 'Admin', lastName: 'User' }
        }
      };
      
      const user = demoUsers[credentials.email];
      
      if (user && credentials.password === 'password123') {
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} loading={loading} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />} />
          <Route path="/students" element={
            <ProtectedRoute allowedRoles={['admin']} user={user}>
              <StudentManagement />
            </ProtectedRoute>
          } />
          <Route path="/subjects" element={
            user.role === 'student' ? 
              <StudentSubjects user={user} /> : 
              <ProtectedRoute allowedRoles={['admin', 'teacher']} user={user}>
                <SubjectManagement />
              </ProtectedRoute>
          } />
          <Route path="/grades" element={
            user.role === 'student' ? 
              <StudentGrades user={user} /> : 
              <ProtectedRoute allowedRoles={['admin', 'teacher']} user={user}>
                <GradeEntry />
              </ProtectedRoute>
          } />
          <Route path="/results" element={user.role === 'student' ? <StudentReport user={user} /> : <GradeResults />} />
          <Route path="/old-students" element={<Students />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;