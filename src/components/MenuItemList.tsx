import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemListProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemList: React.FC<MenuItemListProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-spud-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-spud-border hover:border-spud-orange p-3 sm:p-4 ${!item.available ? 'opacity-60' : ''}`}>
        <div className="flex items-start space-x-3 sm:space-x-4 flex-wrap sm:flex-nowrap">
          {/* Image */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-spud-cream to-spud-light rounded-lg flex-shrink-0">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`absolute inset-0 flex items-center justify-center rounded-lg ${item.image ? 'hidden' : ''}`}>
              <div className="text-2xl opacity-20 text-spud-orange">🥔</div>
            </div>
            
            {/* Badges */}
            <div className="absolute -top-1 -left-1 flex flex-col gap-1">
              {item.isOnDiscount && item.discountPrice && (
                <div className="bg-gradient-to-r from-spud-orange to-spud-hover text-spud-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse border border-spud-brown">
                  SALE
                </div>
              )}
              {item.popular && (
                <div className="bg-gradient-to-r from-spud-brown to-spud-dark text-spud-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg border border-spud-orange">
                  ⭐
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col w-full sm:w-auto">
            <div className="flex items-start justify-between mb-2 w-full">
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-base sm:text-lg font-bold text-spud-brown leading-tight break-words">{item.name}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed mt-1 break-words ${!item.available ? 'text-spud-border' : 'text-spud-dark'}`}>
                  {!item.available ? 'Currently Unavailable' : item.description}
                </p>
              </div>
              
              {/* Price */}
              <div className="text-right flex-shrink-0 ml-2">
                {item.isOnDiscount && item.discountPrice ? (
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <span className="text-lg sm:text-xl font-bold text-spud-orange">
                        ₱{item.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-xs sm:text-sm text-spud-border line-through">
                        ₱{item.basePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-spud-orange font-semibold">
                      Save ₱{(item.basePrice - item.discountPrice).toFixed(2)}
                    </div>
                  </div>
                ) : (
                  <div className="text-lg sm:text-xl font-bold text-spud-brown">
                    ₱{item.basePrice.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {/* Add-ons indicator */}
            {item.addOns && item.addOns.length > 0 && (
              <div className="flex items-center space-x-1 text-xs text-spud-orange bg-spud-cream px-2 py-1 rounded-lg border border-spud-orange font-semibold w-fit mt-2">
                <span>+</span>
                <span>{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto flex justify-end sm:justify-start">
            {!item.available ? (
              <button
                disabled
                className="bg-spud-border text-spud-border px-3 sm:px-4 py-2 rounded-xl cursor-not-allowed font-medium text-xs sm:text-sm border border-spud-border"
              >
                Unavailable
              </button>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-spud-orange to-spud-hover text-spud-white px-4 sm:px-6 py-2 rounded-xl hover:from-spud-hover hover:to-spud-orange transition-all duration-200 transform hover:scale-105 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl border border-spud-brown"
              >
                {item.variations?.length || item.addOns?.length ? 'Customize' : 'Add'}
              </button>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-spud-cream to-spud-light rounded-xl p-1 border-2 border-spud-orange">
                <button
                  onClick={handleDecrement}
                  className="p-1.5 sm:p-2 hover:bg-spud-orange hover:text-spud-white rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-spud-brown" />
                </button>
                <span className="font-bold text-spud-brown min-w-[20px] sm:min-w-[28px] text-center text-xs sm:text-sm">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-1.5 sm:p-2 hover:bg-spud-orange hover:text-spud-white rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-spud-brown" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customization Modal - Same as MenuItemCard */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-spud-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-spud-border">
            <div className="sticky top-0 bg-spud-white border-b border-spud-border p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-spud-brown">Customize {item.name}</h3>
                <p className="text-sm text-spud-dark mt-1">Choose your preferences</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-spud-cream rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-spud-brown" />
              </button>
            </div>

            <div className="p-6">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-spud-brown mb-4">Choose Size</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedVariation?.id === variation.id
                            ? 'border-spud-orange bg-spud-cream'
                            : 'border-spud-border hover:border-spud-orange hover:bg-spud-cream'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-spud-orange focus:ring-spud-orange"
                          />
                          <span className="font-bold text-spud-brown">{variation.name}</span>
                        </div>
                        <span className="text-spud-brown font-bold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-spud-brown mb-4">Add-ons</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-bold text-spud-dark mb-3 capitalize">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-spud-border rounded-xl hover:border-spud-orange hover:bg-spud-cream transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-bold text-spud-brown">{addOn.name}</span>
                              <div className="text-sm text-spud-dark">
                                {addOn.price > 0 ? `₱${addOn.price.toFixed(2)} each` : 'Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-spud-orange rounded-xl p-1 border border-spud-brown">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1.5 hover:bg-spud-hover rounded-lg transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-spud-white" />
                                  </button>
                                  <span className="font-bold text-spud-white min-w-[24px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1.5 hover:bg-spud-hover rounded-lg transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-spud-white" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-spud-orange to-spud-hover text-spud-white rounded-xl hover:from-spud-hover hover:to-spud-orange transition-all duration-200 text-sm font-bold shadow-lg"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t border-spud-border pt-4 mb-6">
                <div className="flex items-center justify-between text-2xl font-bold text-spud-brown">
                  <span>Total:</span>
                  <span className="text-spud-orange">₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-gradient-to-r from-spud-orange to-spud-hover text-spud-white py-4 rounded-xl hover:from-spud-hover hover:to-spud-orange transition-all duration-200 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - ₱{calculatePrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemList;
