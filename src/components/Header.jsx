import { Search, ShoppingCart, Menu, X, ChevronDown, LogOut, UserCircle } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './services/ThemeToggle.js';
import { useTheme } from './services/ThemeContext.js';

const Header = ({ 
  cartCount, 
  onSearch, 
  searchTerm, 
  onCartToggle, 
  currentPage, 
  onNavigateHome, 
  onNavigateShop,
  onNavigateContact,
  onNavigateProfile,
  user,
  onLogout,
  isAuthenticated
}) => {
  const { isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleNavigation = (navigateFunc) => {
    navigateFunc();
    setIsMobileMenuOpen(false);
  };

  const handleUserMenuAction = (action) => {
    action();
    setIsUserMenuOpen(false);
  };

  return (
    <header className={`shadow-sm border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 transition-colors mr-2 ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex-shrink-0">
              <button
                onClick={onNavigateHome}
                className={`text-xl sm:text-2xl font-bold transition-colors ${
                  isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Shopfinity
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={onNavigateHome}
              className={`transition-colors ${
                currentPage === 'home' 
                  ? isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={onNavigateShop}
              className={`transition-colors ${
                currentPage === 'shop' 
                  ? isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            <button
              onClick={onNavigateContact}
              className={`transition-colors ${
                currentPage === 'contact' 
                  ? isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Contact Us
            </button>
          </nav>
          
          {/* Search Bar - Desktop */}
          {currentPage === 'shop' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          )}
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Toggle */}
            {currentPage === 'shop' && (
              <button 
                onClick={toggleMobileSearch}
                className={`md:hidden p-2 transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            {/* Cart Button */}
            <button 
              onClick={onCartToggle}
              className={`p-2 relative transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  isDarkMode ? 'bg-red-600' : 'bg-red-500'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Menu */}
            {isAuthenticated && (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className={`flex items-center space-x-2 p-2 transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                  }`}>
                    <span className="text-white text-sm font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 transition-colors ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}>
                    <div className={`px-4 py-3 border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => handleUserMenuAction(onNavigateProfile)}
                        className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                          currentPage === 'profile' 
                            ? isDarkMode 
                              ? 'text-blue-400 bg-gray-700' 
                              : 'text-blue-600 bg-blue-50'
                            : isDarkMode 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => handleUserMenuAction(onLogout)}
                        className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-gray-700' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {currentPage === 'shop' && isMobileSearchOpen && (
          <div className="md:hidden pb-4 transition-all duration-300 ease-in-out">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t transition-all duration-300 ease-in-out ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <nav className="py-4 space-y-2 transform transition-transform duration-300">
              <button
                onClick={() => handleNavigation(onNavigateHome)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === 'home' 
                    ? isDarkMode 
                      ? 'text-blue-400 font-medium bg-gray-700' 
                      : 'text-blue-600 font-medium bg-blue-50'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation(onNavigateShop)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === 'shop' 
                    ? isDarkMode 
                      ? 'text-blue-400 font-medium bg-gray-700' 
                      : 'text-blue-600 font-medium bg-blue-50'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => handleNavigation(onNavigateContact)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === 'contact' 
                    ? isDarkMode 
                      ? 'text-blue-400 font-medium bg-gray-700' 
                      : 'text-blue-600 font-medium bg-blue-50'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Contact Us
              </button>
              
              {/* Mobile User Menu Items */}
              {isAuthenticated && (
                <>
                  <div className={`border-t my-2 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}></div>
                  <div className="px-4 py-2">
                    <p className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{user?.name}</p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{user?.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavigation(onNavigateProfile)}
                    className={`flex items-center w-full text-left px-4 py-2 transition-colors ${
                      currentPage === 'profile' 
                        ? isDarkMode 
                          ? 'text-blue-400 font-medium bg-gray-700' 
                          : 'text-blue-600 font-medium bg-blue-50'
                        : isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => handleUserMenuAction(onLogout)}
                    className={`flex items-center w-full text-left px-4 py-2 transition-colors ${
                      isDarkMode 
                        ? 'text-red-400 hover:bg-gray-700' 
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;