import React, { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, cartItems = [] }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isInCart = cartItems.some(item => item.id === product.id);
  
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };
  
  const handleAddToCart = () => {
    if (!isInCart) {
      onAddToCart(product);
      toast.success(`${product.title} added to cart!`, {
        toastId: `add-to-cart-${product.id}`
      });
    }
  };
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < Math.floor(rating) ? '#FFD700' : 'none'} 
        color={i < Math.floor(rating) ? '#FFD700' : '#C4C4C4'} 
      />
    ));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-contain" 
        />
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart 
            size={20} 
            fill={isWishlisted ? 'red' : 'none'} 
            color={isWishlisted ? 'red' : 'black'} 
          />
        </button>
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderStars(product.rating?.rate || 0)}
          </div>
          <span className="text-gray-500 text-sm">
            ({product.rating?.count || 0})
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-xl font-bold mr-2">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
            isInCart 
              ? 'bg-red-600 cursor-not-allowed text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ShoppingCart size={18} />
          <span>{isInCart ? 'Already in Cart' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;