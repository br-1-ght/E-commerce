import { useState, useEffect, useRef, useCallback } from 'react';

import Header from './components/Header';
import FilterSidebar from './components/FilterSideBar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Homepage from './components/Home';
import ContactUs from './components/ContactUs';
import Auth from './components/services/Auth';
import UserProfile from './components/Profile';
import ProductService from './components/services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [viewMode, setViewMode] = useState('grid');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [orderHistory, setOrderHistory] = useState([]);
  
  // Refs to prevent duplicate toasts
  const lastToastRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Helper function to show toast with debouncing
  const showToast = useCallback((message, type = 'info') => {
    // Clear any pending toast
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    // Prevent duplicate toasts
    if (lastToastRef.current === message) {
      return;
    }
    
    toast.dismiss(); // Clear any existing toasts
    
    // Set a small delay to prevent rapid-fire toasts
    toastTimeoutRef.current = setTimeout(() => {
      toast[type](message);
      lastToastRef.current = message;
      
      // Clear the last toast reference after the toast duration
      setTimeout(() => {
        lastToastRef.current = null;
      }, 3000);
    }, 100);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkUserSession = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
          const userCart = localStorage.getItem(`cart_${userData.id}`);
          if (userCart) {
            setCart(JSON.parse(userCart));
          }
          // Load user's order history
          const userOrders = localStorage.getItem(`orders_${userData.id}`);
          if (userOrders) {
            setOrderHistory(JSON.parse(userOrders));
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        localStorage.removeItem('currentUser');
      } finally {
        setAuthLoading(false);
      }
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, user]);

  // Save order history whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(orderHistory));
    }
  }, [orderHistory, isAuthenticated, user]);

  useEffect(() => {
    ProductService.fetchProducts()
      .then(({ products, categories }) => {
        setProducts(products);
        setFilteredProducts(products);
        setCategories(categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = ProductService.filterProducts(products, {
      searchTerm,
      selectedCategory,
      priceRange
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    const userCart = localStorage.getItem(`cart_${userData.id}`);
    if (userCart) {
      setCart(JSON.parse(userCart));
    }

    // Load user's order history
    const userOrders = localStorage.getItem(`orders_${userData.id}`);
    if (userOrders) {
      setOrderHistory(JSON.parse(userOrders));
    }
    
    showToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const handleLogout = () => {
    // Save current cart and orders before logout
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(orderHistory));
    }
    
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
    setOrderHistory([]);
    setCurrentPage('home');
    localStorage.removeItem('currentUser');
    
    showToast('Logged out successfully', 'info');
  };

  const navigateToShop = () => setCurrentPage('shop');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToContact = () => setCurrentPage('contact');
  const navigateToProfile = () => setCurrentPage('profile');

  const addToCart = useCallback((product) => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'error');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Use setTimeout to ensure toast shows after state update
        setTimeout(() => showToast('Item quantity updated in cart', 'success'), 0);
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Use setTimeout to ensure toast shows after state update
      setTimeout(() => showToast('Item added to cart', 'success'), 0);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, [isAuthenticated, showToast]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    setTimeout(() => showToast('Item removed from cart', 'info'), 0);
  }, [showToast]);

  const toggleCart = () => {
    if (!isAuthenticated) {
      showToast('Please login to view cart', 'error');
      return;
    }
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = useCallback(() => {
    if (!isAuthenticated) {
      showToast('Please login to checkout', 'error');
      return;
    }
    
    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    
    // Calculate order totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    // Create new order
    const newOrder = {
      id: Date.now().toString(), // Simple ID generation
      date: new Date().toLocaleDateString(),
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: 'Processing'
    };

    // Add order to history
    setOrderHistory(prev => [newOrder, ...prev]);
    
    setTimeout(() => showToast('Order placed successfully!', 'success'), 0);
    setCart([]);
    setIsCartOpen(false);
  }, [isAuthenticated, cart, showToast]);

  const handleSearch = (term) => setSearchTerm(term);
  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handlePriceChange = (price) => setPriceRange(price);
  const handleViewModeChange = (mode) => setViewMode(mode);

  const handleToggleWishlist = useCallback((productId) => {
    if (!isAuthenticated) {
      showToast('Please login to add to wishlist', 'error');
      return;
    }
    console.log('Toggle wishlist for product:', productId);
    showToast('Wishlist feature coming soon!', 'info');
  }, [isAuthenticated, showToast]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
        />
        <Auth onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      
      <Header 
        cartCount={cartCount}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onCartToggle={toggleCart}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateShop={navigateToShop}
        onNavigateContact={navigateToContact}
        onNavigateProfile={navigateToProfile}
        user={user}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      
      {currentPage === 'home' ? (
        <Homepage onShopNow={navigateToShop} />
      ) : currentPage === 'contact' ? (
        <ContactUs />
      ) : currentPage === 'profile' ? (
        <UserProfile 
          user={user} 
          onUpdateUser={setUser}
          orderHistory={orderHistory}
        />
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 py-6">
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <FilterSidebar 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                minPrice={0}
                maxPrice={1000}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <ProductGrid 
                products={filteredProducts}
                onAddToCart={addToCart}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                loading={loading}
                onToggleWishlist={handleToggleWishlist}
                cartItems={cart}
              />
            </div>
          </div>
        </div>
      )}
      
      <Cart 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        onToggleCart={toggleCart}
      />
    </div>
  );
};

export default App;