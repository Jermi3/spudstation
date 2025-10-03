import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🥔</div>
          <h2 className="text-2xl font-pretendard font-bold text-spud-brown mb-2">Your cart is empty</h2>
          <p className="text-spud-dark mb-6">Add some delicious potatoes to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-spud-orange text-spud-white px-8 py-4 rounded-xl hover:bg-spud-hover transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-spud-brown hover:text-spud-orange transition-colors duration-200 bg-spud-cream px-4 py-2 rounded-xl border border-spud-border"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Continue Shopping</span>
        </button>
        <h1 className="text-3xl font-pretendard font-bold text-spud-brown">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-spud-orange hover:text-spud-hover transition-colors duration-200 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="bg-spud-white rounded-xl shadow-lg overflow-hidden mb-8 border-2 border-spud-border">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-spud-border' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-pretendard font-bold text-spud-brown mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-spud-dark mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-spud-dark mb-1">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-bold text-spud-orange">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-spud-cream rounded-xl p-1 border-2 border-spud-orange">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-spud-orange hover:text-spud-white rounded-lg transition-all duration-200"
                  >
                    <Minus className="h-4 w-4 text-spud-brown" />
                  </button>
                  <span className="font-bold text-spud-brown min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-spud-orange hover:text-spud-white rounded-lg transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 text-spud-brown" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-spud-brown">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-spud-orange hover:text-spud-hover hover:bg-spud-cream rounded-lg transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-spud-white rounded-xl shadow-lg p-6 border-2 border-spud-border">
        <div className="flex items-center justify-between text-2xl font-pretendard font-bold text-spud-brown mb-6">
          <span>Total:</span>
          <span className="text-spud-orange">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-spud-orange to-spud-hover text-spud-white py-4 rounded-xl hover:from-spud-hover hover:to-spud-orange transition-all duration-200 transform hover:scale-[1.02] font-bold text-lg shadow-lg hover:shadow-xl border border-spud-brown"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;