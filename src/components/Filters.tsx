import React from 'react';
import { FilterState } from '../types';
import { Star } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
  colors: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  categories,
  brands,
  colors,
}) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => onFilterChange({
              ...filters,
              priceRange: [Number(e.target.value), filters.priceRange[1]]
            })}
            className="w-24 px-2 py-1 border rounded"
            placeholder="Min"
          />
          <span>to</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], Number(e.target.value)]
            })}
            className="w-24 px-2 py-1 border rounded"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category);
                  onFilterChange({ ...filters, categories: newCategories });
                }}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Rating</h3>
        <div className="flex items-center space-x-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onFilterChange({ ...filters, minRating: rating })}
              className={`flex items-center p-2 rounded ${
                filters.minRating === rating ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <Star className={`w-5 h-5 ${
                filters.minRating >= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`} />
              <span className="ml-1">{rating}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                const newColors = filters.colors.includes(color)
                  ? filters.colors.filter(c => c !== color)
                  : [...filters.colors, color];
                onFilterChange({ ...filters, colors: newColors });
              }}
              className={`px-3 py-1 rounded ${
                filters.colors.includes(color)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};