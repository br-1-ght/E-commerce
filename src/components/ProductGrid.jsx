import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Grid, List } from 'lucide-react';
import { useTheme } from './services/ThemeContext';

const ProductGrid = ({ 
  products, 
  onAddToCart, 
  viewMode, 
  onViewModeChange,
  loading = false,
  onToggleWishlist,
  cartItems = []
}) => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Force grid view on mobile
  useEffect(() => {
    if (isMobile && viewMode === 'list') {
      onViewModeChange('grid');
    }
  }, [isMobile, viewMode, onViewModeChange]);

  if (loading) {
    return (
      <div className={`flex-1 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`rounded-lg shadow-md overflow-hidden animate-pulse ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`w-full h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className="p-4 space-y-3">
                <div className={`h-4 rounded w-3/4 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                <div className={`h-4 rounded w-1/2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
                <div className={`h-8 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const ProductListView = ({ products, cartItems, onAddToCart }) => (
    <div className="space-y-4">
      {products.map(product => {
        const isInCart = cartItems.some(item => item.id === product.id);
        
        return (
          <div 
            key={product.id} 
            className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <div className="flex">
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className={`font-semibold mb-2 hover:text-blue-600 transition-colors ${
                    isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                  }`}>
                    {product.title}
                  </h3>
                  <p className={`text-sm mb-3 line-clamp-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {product.description}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${
                            i < Math.floor(product.rating?.rate || 0) 
                              ? 'text-yellow-400' 
                              : isDarkMode ? 'text-gray-500' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={`text-sm ml-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      ({product.rating?.count || 0})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className={`text-sm line-through ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={isInCart}
                    className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                      isInCart 
                        ? isDarkMode 
                          ? 'bg-red-700 text-gray-300 cursor-not-allowed' 
                          : 'bg-red-600 text-white cursor-not-allowed'
                        : isDarkMode 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`flex-1 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`hidden md:flex items-center border rounded-lg ${
            isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'
          }`}>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 ${
                viewMode === 'grid' 
                  ? isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-600 text-white'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
              } rounded-md`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 ${
                viewMode === 'list' 
                  ? isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-600 text-white'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
              } rounded-md`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <div className={`md:hidden text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Grid View
          </div>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className={`text-lg mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}>No products found</div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}>
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'list' && !isMobile ? (
            <ProductListView 
              products={products}
              cartItems={cartItems}
              onAddToCart={onAddToCart}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  cartItems={cartItems}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;