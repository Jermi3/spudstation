import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-spud-light/95 backdrop-blur-md border-b-2 border-spud-orange shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-spud-border rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 shadow-sm ${
                  selectedCategory === 'all'
                    ? 'bg-spud-orange text-spud-white border-spud-orange shadow-lg'
                    : 'bg-spud-white text-spud-brown border-spud-border hover:border-spud-orange hover:bg-spud-cream'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 shadow-sm flex items-center space-x-2 ${
                    selectedCategory === c.id
                      ? 'bg-spud-orange text-spud-white border-spud-orange shadow-lg'
                      : 'bg-spud-white text-spud-brown border-spud-border hover:border-spud-orange hover:bg-spud-cream'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


