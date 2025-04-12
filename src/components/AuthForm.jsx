import React from 'react';
import { useTheme } from '../context/ThemeContext';

function AuthForm({
  isLogin,
  setIsLogin,
  authForm,
  handleAuthInputChange,
  handleAuth,
  formErrors,
  isLoading
}) {
  const { isDark } = useTheme();

  const handleToggleAuth = () => {
    setIsLogin(!isLogin);
    Object.keys(formErrors).forEach(key => {
      formErrors[key] = '';
    });
  };

  const inputClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    isDark 
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
      : 'bg-white border-gray-300 text-gray-900'
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`rounded-lg p-8 shadow-md w-full max-w-md ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold text-center mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {isLogin ? 'Login to TaskMate' : 'Create an Account'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={authForm.name}
                onChange={handleAuthInputChange}
                className={`${inputClasses} ${formErrors.name ? 'border-red-500' : ''}`}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? 'name-error' : undefined}
              />
              {formErrors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={authForm.email}
              onChange={handleAuthInputChange}
              className={`${inputClasses} ${formErrors.email ? 'border-red-500' : ''}`}
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? 'email-error' : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              value={authForm.password}
              onChange={handleAuthInputChange}
              className={`${inputClasses} ${formErrors.password ? 'border-red-500' : ''}`}
              aria-invalid={!!formErrors.password}
              aria-describedby={formErrors.password ? 'password-error' : undefined}
            />
            {formErrors.password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <p className={`text-center mt-4 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={handleToggleAuth}
            className="ml-1 text-blue-600 hover:text-blue-800"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm; 