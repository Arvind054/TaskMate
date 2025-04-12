import React, { useState, useEffect } from 'react';
import { Plus, Search, LogOut, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import AuthForm from './components/AuthForm';
import { useTheme } from './context/ThemeContext';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: ''
  });

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Others'];
  const API_BASE_URL = 'http://localhost:5000';

  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        fetchTasks();
      } catch (e) {
        console.error('Error getting user data:', e);
        handleLogout();
      }
    }
  }, []);

  const validateAuthForm = () => {
    const errors = {
      email: '',
      password: '',
      name: ''
    };
    let isValid = true;

    if (!authForm.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authForm.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!authForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (authForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!isLogin && !authForm.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    
    if (!validateAuthForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, authForm, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthModalOpen(false);
        toast.success(isLogin ? 'Logged in successfully' : 'Registered successfully');
        fetchTasks();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Auth error:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Authentication failed';
        toast.error(errorMessage);
        if (error.response.data?.error) {
          console.error('Server error details:', error.response.data.error);
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection');
        console.error('No response received:', error.request);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTasks([]);
    setIsAuthModalOpen(true);
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingTask) {
        await axios.put(
          `${API_BASE_URL}/api/tasks/${editingTask._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Task updated successfully');
      } else {
        await axios.post(
          `${API_BASE_URL}/api/tasks`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Task created successfully');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      setFormData({ title: '', description: '', dueDate: '', category: '' });
      fetchTasks();
    } catch (error) {
      console.error('Task operation error:', error);
      toast.error(editingTask ? 'Failed to update task' : 'Failed to create task');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Delete task error:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split('T')[0],
      category: task.category
    });
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isAuthModalOpen) {
    return (
      <AuthForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        authForm={authForm}
        handleAuthInputChange={handleAuthInputChange}
        handleAuth={handleAuth}
        formErrors={formErrors}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              TaskMate
            </h1>
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Welcome, {user?.name}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => {
                setEditingTask(null);
                setFormData({ title: '', description: '', dueDate: '', category: '' });
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              aria-label="Add new task"
            >
              <Plus size={20} /> Add Task
            </button>
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Logout"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        <div className="mb-8 flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                aria-label="Search tasks"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDark={isDark}
        />
      </div>

      <TaskForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        editingTask={editingTask}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        isDark={isDark}
      />
    </div>
  );
}

export default App; 