import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, BarChart3, User, LogOut, Plus, Edit, Award } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const getDashboardContent = () => {
    switch (user.role) {
      case 'student':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Dashboard</h2>
              <p className="text-gray-600">Welcome, {user.fullName}!</p>
              <p className="text-gray-600">View your grades, performance reports, and academic progress.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/results" className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">My Grades</h3>
                    <p className="text-gray-600">View your academic performance</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/results" className="bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
                    <p className="text-gray-600">Download your report cards</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/subjects" className="bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Subjects</h3>
                    <p className="text-gray-600">View enrolled subjects</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
        
      case 'teacher':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Dashboard</h2>
              <p className="text-gray-600">Welcome, {user.fullName}!</p>
              <p className="text-gray-600">Manage your subjects, enter grades, and track student performance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/subjects" className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">My Subjects</h3>
                    <p className="text-gray-600">Manage your teaching subjects</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/grades" className="bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Enter Grades</h3>
                    <p className="text-gray-600">Input and update student grades</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/results" className="bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                    <p className="text-gray-600">View performance analytics</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
        
      case 'admin':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
              <p className="text-gray-600">Welcome, {user.fullName}!</p>
              <p className="text-gray-600">Manage users, subjects, and system settings.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Link to="/students" className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Students</h3>
                    <p className="text-gray-600">Manage all students</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/subjects" className="bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Subjects</h3>
                    <p className="text-gray-600">Manage subjects</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/grades" className="bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <Edit className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Grades</h3>
                    <p className="text-gray-600">Manage grade entries</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/results" className="bg-yellow-50 rounded-lg p-6 hover:bg-yellow-100 transition-colors">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Results</h3>
                    <p className="text-gray-600">View all results & reports</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
        
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-semibold text-gray-900">
                Student Grading System
              </Link>
              <div className="hidden md:flex space-x-6">
                {user.role === 'admin' && (
                  <Link to="/students" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Students
                  </Link>
                )}
                {user.role !== 'student' && (
                  <Link to="/subjects" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Subjects
                  </Link>
                )}
                {user.role !== 'student' && (
                  <Link to="/grades" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Grades
                  </Link>
                )}
                <Link to="/results" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  {user.role === 'student' ? 'My Results' : 'Results'}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user.fullName}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {user.role.toUpperCase()}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {getDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;
