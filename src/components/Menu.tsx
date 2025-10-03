import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';
import MenuItemList from './MenuItemList';
import ViewToggle from './ViewToggle';
import MobileNav from './MobileNav';

// Preload images for better performance
const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState('hot-coffee');
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  // Check if device is mobile and set default view
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      if (mobile && view === 'grid') {
        setView('list');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [view]);

  // Preload images when menu items change
  React.useEffect(() => {
    if (menuItems.length > 0) {
      // Preload images for visible category first
      const visibleItems = menuItems.filter(item => item.category === activeCategory);
      preloadImages(visibleItems);
      
      // Then preload other images after a short delay
      setTimeout(() => {
        const otherItems = menuItems.filter(item => item.category !== activeCategory);
        preloadImages(otherItems);
      }, 1000);
    }
  }, [menuItems, activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 64; // Header height
      const mobileNavHeight = 60; // Mobile nav height
      const offset = headerHeight + mobileNavHeight + 20; // Extra padding
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      // Set default to dim-sum if it exists, otherwise first category
      const defaultCategory = categories.find(cat => cat.id === 'dim-sum') || categories[0];
      if (!categories.find(cat => cat.id === activeCategory)) {
        setActiveCategory(defaultCategory.id);
      }
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <MobileNav 
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-pretendard font-bold text-spud-brown mb-4">Our Menu</h2>
        <div className="w-24 h-1 bg-spud-orange mx-auto mb-6 rounded-full"></div>
        <p className="text-spud-dark max-w-2xl mx-auto text-lg leading-relaxed">
          Discover our selection of loaded baked potatoes and crispy flavored fries, 
          all prepared with premium ingredients and authentic flavors.
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>

      {categories.map((category) => {
        const categoryItems = menuItems.filter(item => item.category === category.id);
        
        if (categoryItems.length === 0) return null;
        
        return (
          <section key={category.id} id={category.id} className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-spud-orange rounded-2xl p-4 shadow-lg">
                <span className="text-4xl">{category.icon}</span>
              </div>
              <div className="ml-6">
                <h3 className="text-4xl font-pretendard font-bold text-spud-brown uppercase tracking-wide">{category.name}</h3>
                <div className="w-16 h-1 bg-spud-orange mt-2 rounded-full"></div>
              </div>
            </div>
            
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryItems.map((item) => {
                  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                  return (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={addToCart}
                      quantity={cartItem?.quantity || 0}
                      onUpdateQuantity={updateQuantity}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {categoryItems.map((item) => {
                  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                  return (
                    <MenuItemList
                      key={item.id}
                      item={item}
                      onAddToCart={addToCart}
                      quantity={cartItem?.quantity || 0}
                      onUpdateQuantity={updateQuantity}
                    />
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
      </main>
    </>
  );
};

export default Menu;