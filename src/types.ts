export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  color: string;
  brand: string;
  description: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  colors: string[];
  brands: string[];
  minRating: number;
}