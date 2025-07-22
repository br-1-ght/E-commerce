import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from './services/ThemeContext';

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceChange,
  minPrice = 0,
  maxPrice = 1000
}) => {
  const { isDarkMode } = useTheme();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true
  });

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-64 p-6 border-r h-fit sticky top-4 ${
        isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex items-center mb-6">
          <Filter className={`w-5 h-5 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } mr-2`} />
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Filters</h3>
        </div>
        
        {/* Categories Section */}
        <div className="mb-6">
          <h4 className={`text-sm font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } mb-3`}>Categories</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={`mr-3 ${
                  isDarkMode 
                    ? 'text-blue-400 focus:ring-blue-500' 
                    : 'text-blue-600 focus:ring-blue-500'
                }`}
              />
              <span className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>All Categories</span>
            </label>
            {categories.map(category => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className={`mr-3 ${
                    isDarkMode 
                      ? 'text-blue-400 focus:ring-blue-500' 
                      : 'text-blue-600 focus:ring-blue-500'
                  }`}
                />
                <span className={`capitalize ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{category}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Price Range Section */}
        <div className="mb-6">
          <h4 className={`text-sm font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } mb-3`}>Price Range</h4>
          <div className="space-y-3">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            />
            <div className={`flex justify-between text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span>${minPrice}</span>
              <span className="font-medium">${priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Filter Bar */}
      <div className={`lg:hidden border-b sticky top-16 z-40 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={toggleMobileFilter}
              className={`flex items-center space-x-2 transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
            
            {/* Active filter indicators */}
            <div className="flex items-center space-x-2">
              {selectedCategory && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-blue-900 text-blue-300' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedCategory}
                </span>
              )}
              {priceRange !== maxPrice && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-blue-900 text-blue-300' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  ${priceRange}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {isMobileFilterOpen && (
            <div className={`border-t py-4 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              {/* Categories Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('categories')}
                  className={`flex items-center justify-between w-full mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <h4 className="text-sm font-medium">Categories</h4>
                  {expandedSections.categories ? (
                    <ChevronUp className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  ) : (
                    <ChevronDown className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  )}
                </button>
                {expandedSections.categories && (
                  <div className="space-y-2 ml-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className={`mr-3 ${
                          isDarkMode 
                            ? 'text-blue-400 focus:ring-blue-500' 
                            : 'text-blue-600 focus:ring-blue-500'
                        }`}
                      />
                      <span className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>All Categories</span>
                    </label>
                    {categories.map(category => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => onCategoryChange(e.target.value)}
                          className={`mr-3 ${
                            isDarkMode 
                              ? 'text-blue-400 focus:ring-blue-500' 
                              : 'text-blue-600 focus:ring-blue-500'
                          }`}
                        />
                        <span className={`capitalize ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Range Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('price')}
                  className={`flex items-center justify-between w-full mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <h4 className="text-sm font-medium">Price Range</h4>
                  {expandedSections.price ? (
                    <ChevronUp className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  ) : (
                    <ChevronDown className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  )}
                </button>
                {expandedSections.price && (
                  <div className="space-y-3 ml-4">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(e) => onPriceChange(Number(e.target.value))}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}
                    />
                    <div className={`flex justify-between text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span>${minPrice}</span>
                      <span className="font-medium">${priceRange}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;