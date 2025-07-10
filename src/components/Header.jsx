import { Search, ShoppingCart, Menu, X, ChevronDown, LogOut, UserCircle } from 'lucide-react';
import { useState } from 'react';

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
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors mr-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex-shrink-0">
              <button
                onClick={onNavigateHome}
                className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
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
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={onNavigateShop}
              className={`transition-colors ${
                currentPage === 'shop' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            <button
              onClick={onNavigateContact}
              className={`transition-colors ${
                currentPage === 'contact' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Contact Us
            </button>
          </nav>
          
          {/* Search Bar - Desktop */}
          {currentPage === 'shop' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            {/* Cart Button */}
            <button 
              onClick={onCartToggle}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* User Menu */}
            {isAuthenticated && (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => handleUserMenuAction(onNavigateProfile)}
                        className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                          currentPage === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                        }`}
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => handleUserMenuAction(onLogout)}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 transition-all duration-300 ease-in-out">
            <nav className="py-4 space-y-2 transform transition-transform duration-300">
              <button
                onClick={() => handleNavigation(onNavigateHome)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === 'home' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation(onNavigateShop)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === 'shop' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => handleNavigation(onNavigateContact)}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  currentPage === 'contact' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Contact Us
              </button>
              
              {/* Mobile User Menu Items */}
              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavigation(onNavigateProfile)}
                    className={`flex items-center w-full text-left px-4 py-2 transition-colors ${
                      currentPage === 'profile' 
                        ? 'text-blue-600 font-medium bg-blue-50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => handleUserMenuAction(onLogout)}
                    className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
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