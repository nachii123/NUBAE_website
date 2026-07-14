import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const CategoryModal = ({ isOpen, onClose, category, onQuickView, onAddToCart }) => {
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter(product => product.category === category.name);
  }, [category]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg max-w-6xl w-full my-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-stone/20 p-6 flex items-center justify-between rounded-t-lg">
              <div>
                <h2 className="text-3xl font-display font-normal text-charcoal">
                  {category?.name}
                </h2>
                <p className="text-charcoal/60 mt-1">
                  {categoryProducts.length} products available
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone/10 rounded-full transition-colors"
              >
                <FiX size={28} />
              </button>
            </div>

            {/* Products Grid */}
            <div className="p-6 md:p-8">
              {categoryProducts.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                  layout
                >
                  {categoryProducts.map((product) => (
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
                  <p className="text-lg text-charcoal/60">
                    No products found in this category
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
