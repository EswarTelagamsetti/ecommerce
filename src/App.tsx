import React, { useState, useMemo } from 'react';
import { Product, FilterState, SortOption } from './types';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { ProductSort } from './components/ProductSort';
import { ShoppingCart } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: [],
    colors: [],
    brands: [],
    minRating: 0,
  });

  const [sortOption, setSortOption] = useState<SortOption>('price-asc');

  // Extract unique values for filter options
  const categories = [...new Set(products.map(p => p.category))];
  const colors = [...new Set(products.map(p => p.color))];
  const brands = [...new Set(products.map(p => p.brand))];

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesPrice = product.price >= filters.priceRange[0] && 
                           product.price <= filters.priceRange[1];
        const matchesCategory = filters.categories.length === 0 || 
                              filters.categories.includes(product.category);
        const matchesColor = filters.colors.length === 0 || 
                           filters.colors.includes(product.color);
        const matchesBrand = filters.brands.length === 0 || 
                           filters.brands.includes(product.brand);
        const matchesRating = product.rating >= filters.minRating;

        return matchesPrice && matchesCategory && matchesColor && 
               matchesBrand && matchesRating;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [filters, sortOption]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ShopHub</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              brands={brands}
              colors={colors}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} products
              </p>
              <ProductSort
                sortOption={sortOption}
                onSortChange={setSortOption}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;