import { Minus, Plus, X, ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';
import { useTheme } from './services/ThemeContext';

const Cart = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  isOpen, 
  onClose,
  onCheckout,
  onToggleCart
}) => {
  const { isDarkMode } = useTheme();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total > 100 ? 0 : 10;
  const finalTotal = total + shipping;
  
  const MobileCartButton = () => (
    <button
      onClick={onToggleCart}
      className={`md:hidden fixed bottom-4 left-4 p-4 rounded-full shadow-lg transition-all duration-200 z-50 hover:scale-110 ${
        isDarkMode 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className={`absolute -top-2 -right-2 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold ${
          isDarkMode ? 'bg-red-600' : 'bg-red-500'
        }`}>
          {totalItems}
        </span>
      )}
    </button>
  );
  
  if (!isOpen) {
    return <MobileCartButton />;
  }
  
  return (
    <>
      <MobileCartButton />
      
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className={`w-full max-w-md shadow-xl h-full flex flex-col md:max-w-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className={`p-4 border-b flex items-center justify-between ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <ShoppingBag className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <h2 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-500'
              }`} />
            </button>
          </div>

          <div className={`flex-1 overflow-y-auto p-4 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-300'
                }`} />
                <p className={`text-lg mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>Your cart is empty</p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}>
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div 
                    key={item.id} 
                    className={`rounded-lg p-4 flex space-x-4 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="w-16 h-16 flex-shrink-0 sm:w-20 sm:h-20">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm line-clamp-2 mb-1 sm:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h4>
                      <p className={`font-semibold sm:text-lg ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>${item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className={`p-1 rounded-full transition-colors ${
                              isDarkMode 
                                ? 'hover:bg-gray-700' 
                                : 'hover:bg-gray-200'
                            } ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className={`w-4 h-4 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`} />
                          </button>
                          <span className={`px-3 py-1 rounded border text-sm font-medium min-w-[40px] text-center ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className={`p-1 rounded-full transition-colors ${
                              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                            }`}
                          >
                            <Plus className={`w-4 h-4 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className={`p-1 rounded-full transition-colors ${
                            isDarkMode 
                              ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' 
                              : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className={`p-4 border-t space-y-4 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Free shipping on orders over $100
                  </p>
                )}
                <div className={`border-t pt-2 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between">
                    <span className={`text-base font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Total</span>
                    <span className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={onCheckout}
                  className={`w-full py-3 rounded-lg font-medium text-base transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={onClose}
                  className={`w-full py-2 rounded-lg text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;