import React from 'react';
import { SortOption } from '../types';

interface ProductSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const ProductSort: React.FC<ProductSortProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">Sort by:</span>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="border rounded-md px-3 py-1.5 bg-white"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
};