import { useTheme } from "./services/ThemeContext";

const Homepage = ({ onShopNow }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className={`text-6xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>ShopFinity</span>
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover amazing products at unbeatable prices. From electronics to fashion, 
            we have everything you need in one place.
          </p>
          <button
            onClick={onShopNow}
            className={`bg-gradient-to-r text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900' 
                : 'from-blue-500 to-blue-900 hover:from-blue-600 hover:to-blue-950'
            }`}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`text-center p-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Free shipping on orders over $50
            </p>
          </div>
          <div className={`text-center p-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Your payment information is safe with us
            </p>
          </div>
          <div className={`text-center p-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="text-4xl mb-4">↩️</div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              30-day return policy on all items
            </p>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className={`text-4xl font-bold text-center mb-12 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Shop by Category</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`h-48 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                : 'bg-gradient-to-r from-purple-400 to-pink-400'
            }`}>
              <span className="text-6xl">📱</span>
            </div>
            <div className="p-4">
              <h3 className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Electronics</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Latest gadgets and tech
              </p>
            </div>
          </div>
          <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`h-48 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-600 to-blue-600' 
                : 'bg-gradient-to-r from-green-400 to-blue-400'
            }`}>
              <span className="text-6xl">👔</span>
            </div>
            <div className="p-4">
              <h3 className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Fashion</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Trendy clothing and accessories
              </p>
            </div>
          </div>
          <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`h-48 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-400'
            }`}>
              <span className="text-6xl">🧳</span>
            </div>
            <div className="p-4">
              <h3 className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Bags</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Get custom bags
              </p>
            </div>
          </div>
          <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`h-48 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-red-600 to-pink-600' 
                : 'bg-gradient-to-r from-red-400 to-pink-400'
            }`}>
              <span className="text-6xl">🎮</span>
            </div>
            <div className="p-4">
              <h3 className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Gaming</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Games accessories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;