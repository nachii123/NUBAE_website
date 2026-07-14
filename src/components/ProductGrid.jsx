import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onQuickView, onAddToCart, isCarousel = false }) => {
  const [sortBy, setSortBy] = useState('newest');

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [products, sortBy]);

  return (
    <div className="w-full">
      {/* Sorting Bar */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-charcoal/60">
          Showing {products.length} products
        </p>
        <div className="flex items-center gap-3">
          <label className="text-sm text-charcoal/60 whitespace-nowrap">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-stone rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-taupe"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          layout
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-charcoal/60">No products found</p>
          <p className="text-sm text-charcoal/40 mt-2">
            Try adjusting your filters
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductGrid;
