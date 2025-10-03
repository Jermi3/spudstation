import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <>
      {/* Checkerboard top border */}
      <div className="h-2 bg-checkerboard bg-checkerboard-small"></div>
      
      <header className="sticky top-2 z-50 bg-spud-light/95 backdrop-blur-md border-b-2 border-spud-orange shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onMenuClick}
              className="flex items-center space-x-3 text-spud-brown hover:text-spud-orange transition-colors duration-200"
            >
              {loading ? (
                <div className="w-12 h-12 bg-spud-border rounded-xl animate-pulse" />
              ) : (
                <div className="relative">
                  <img 
                    src={siteSettings?.site_logo || "/logo.jpg"} 
                    alt={siteSettings?.site_name || "Spud Station"}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-spud-orange shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = "/logo.jpg";
                    }}
                  />
                  {/* Potato icon overlay */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-spud-orange rounded-full flex items-center justify-center text-spud-white text-xs">
                    🥔
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-pretendard font-bold text-spud-brown">
                  {loading ? (
                    <div className="w-32 h-6 bg-spud-border rounded animate-pulse" />
                  ) : (
                    "SPUD STATION"
                  )}
                </h1>
                <p className="text-xs text-spud-orange font-medium -mt-1">
                  BAKED POTATOES & SNACKS
                </p>
              </div>
            </button>

            <div className="flex items-center space-x-2">
              <button 
                onClick={onCartClick}
                className="relative p-3 text-spud-brown hover:text-spud-orange hover:bg-spud-cream rounded-xl transition-all duration-200 border border-spud-border"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-spud-orange text-spud-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;