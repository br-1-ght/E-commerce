
const Homepage = ({ onShopNow }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">ShopFinity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. From electronics to fashion, 
            we have everything you need in one place.
          </p>
          <button
            onClick={onShopNow}
            className="bg-gradient-to-r from-blue-500 to-blue-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free shipping on orders over $50</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">Your payment information is safe with us</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">↩️</div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy on all items</p>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-6xl">📱</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Electronics</h3>
              <p className="text-gray-600">Latest gadgets and tech</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
              <span className="text-6xl">👔</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Fashion</h3>
              <p className="text-gray-600">Trendy clothing and accessories</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
              <span className="text-6xl">🧳</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Bags</h3>
              <p className="text-gray-600">Get custom bags</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center">
              <span className="text-6xl">🎮</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Gaming</h3>
              <p className="text-gray-600">Games accessories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;