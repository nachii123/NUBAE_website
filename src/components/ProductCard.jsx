import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-stone/5 h-56 md:h-64">
          {/* Product Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              className="absolute top-4 right-4 bg-charcoal text-cream px-3 py-1 rounded-full text-sm font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              -{discount}%
            </motion.div>
          )}

          {/* Stock Badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300 flex items-end justify-center pb-4 gap-3"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.button
              onClick={() => onQuickView(product)}
              className="bg-white text-charcoal px-4 py-2 rounded-full flex items-center gap-2 hover:bg-taupe hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiEye size={16} /> Quick View
            </motion.button>

            <motion.button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isWishlisted
                  ? 'bg-taupe text-white'
                  : 'bg-white text-charcoal hover:bg-taupe hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiHeart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-xs tracking-widest text-taupe uppercase mb-2">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-base font-display font-normal text-charcoal mb-2 line-clamp-2 hover:text-taupe transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < Math.floor(product.rating) ? 'text-taupe' : 'text-stone/30'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-charcoal/60">({product.reviews})</span>
          </div>

          {/* Description */}
          <p className="text-sm text-charcoal/60 line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-charcoal">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal/40 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
              product.inStock
                ? 'bg-charcoal text-cream hover:bg-stone'
                : 'bg-stone/30 text-charcoal/50 cursor-not-allowed'
            }`}
            whileHover={product.inStock ? { scale: 1.02 } : {}}
            whileTap={product.inStock ? { scale: 0.98 } : {}}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
