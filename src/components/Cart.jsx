import { Minus, Plus, X, ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';

const Cart = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  isOpen, 
  onClose,
  onCheckout,
  onToggleCart
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total > 100 ? 0 : 10;
  const finalTotal = total + shipping;
  
  const MobileCartButton = () => (
    <button
      onClick={onToggleCart}
      className="md:hidden fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 z-50 hover:scale-110"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
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
        <div className="w-full max-w-md bg-white shadow-xl h-full flex flex-col md:max-w-lg">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-400">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex space-x-4">
                    <div className="w-16 h-16 flex-shrink-0 sm:w-20 sm:h-20">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 font-semibold sm:text-lg">${item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-500" />
                          </button>
                          <span className="px-3 py-1 bg-white rounded border border-gray-300 text-sm font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
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
            <div className="p-4 border-t border-gray-200 space-y-4 bg-white">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Free shipping on orders over $100
                  </p>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={onCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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