const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Student API methods
  async getStudents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/students${queryString ? `?${queryString}` : ''}`);
  }

  async getStudentById(id) {
    return this.request(`/students/${id}`);
  }

  async createStudent(studentData) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(id, studentData) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  }

  async deleteStudent(id) {
    return this.request(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Student-specific API methods
  async getStudentSubjects(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/student/subjects${queryString ? `?${queryString}` : ''}`);
  }

  async getStudentGrades(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/student/grades${queryString ? `?${queryString}` : ''}`);
  }

  async getStudentReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/student/report${queryString ? `?${queryString}` : ''}`);
  }

  async getStudentPerformance(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/student/performance${queryString ? `?${queryString}` : ''}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();