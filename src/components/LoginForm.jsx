import React from 'react';
import { useTheme } from './services/ThemeContext';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
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
    const { email, password } = formData;
    
    if (!email.trim() || !password.trim()) {
      setFormError('Both email and password are required.');
      return;
    }
    
    setLoading(true);
    try {
      await onLogin(email, password);
      setFormData({ email: '', password: '' });
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
        {/* Stripe Logo */}
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
              Sign in to your account
            </h1>
            <p className={`${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                required
                autoComplete="current-password"
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
                  <div className={`w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 ${
                    isDarkMode ? 'border-gray-300 border-t-transparent' : 'border-white border-t-transparent'
                  }`}></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <div className="text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className={`font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        <div className={`mt-8 text-center text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-slate-500'
        }`}>
          <p>
            By signing in, you agree to our{' '}
            <span className={`${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            }`}>Terms of Service</span>{' '}
            and{' '}
            <span className={`${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            }`}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;