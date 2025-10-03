import React from 'react';
import { Grid3X3, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-spud-cream rounded-xl p-1 border border-spud-border">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all duration-200 ${
          view === 'grid'
            ? 'bg-spud-orange text-spud-white shadow-md'
            : 'text-spud-brown hover:bg-spud-orange hover:text-spud-white'
        }`}
        title="Grid View"
      >
        <Grid3X3 className="h-5 w-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-all duration-200 ${
          view === 'list'
            ? 'bg-spud-orange text-spud-white shadow-md'
            : 'text-spud-brown hover:bg-spud-orange hover:text-spud-white'
        }`}
        title="List View"
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ViewToggle;
