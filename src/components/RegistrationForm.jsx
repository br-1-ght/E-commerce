import React from 'react';
import { useTheme } from './services/ThemeContext';

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formError, setFormError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    
    setLoading(true);
    try {
      await onRegister({ name, email, password });
      setFormData({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="w-full max-w-md">
        {/* Shopfinity Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600'
            }`}>
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Shopfinity</span>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg border p-8 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Create your account
            </h1>
            <p className={`${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Get started with your free account today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
                placeholder="Create a password (min 6 chars)"
                required
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-slate-700'
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
              />
            </div>

            {(formError || error) && (
              <div className={`border rounded-lg p-3 ${
                isDarkMode 
                  ? 'bg-red-900 border-red-700' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm ${
                  isDarkMode ? 'text-red-300' : 'text-red-600'
                }`}>{formError || error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                isDarkMode
                  ? loading
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-gray-300 opacity-50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-gray-800'
                  : loading
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white opacity-50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className={`w-5 h-5 border-2 rounded-full animate-spin mr-2 ${
                    isDarkMode ? 'border-gray-300 border-t-transparent' : 'border-white border-t-transparent'
                  }`}></div>
                  Creating account...
                </div>
              ) : (
                'Sign up'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className={`font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-center text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-slate-500'
        }`}>
          <p>
            By signing up, you agree to our{' '}
            <span className={`${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            } transition-colors cursor-pointer`}>Terms of Service</span>{' '}
            and{' '}
            <span className={`${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            } transition-colors cursor-pointer`}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;