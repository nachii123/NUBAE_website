import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiHeart } from 'react-icons/fi';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const images = [product.image, product.image, product.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="bg-stone/5 rounded-lg overflow-hidden h-96">
                  <motion.img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-taupe'
                          : 'border-stone/20 hover:border-taupe'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-stone/10 rounded-full transition-colors"
                >
                  <FiX size={24} />
                </button>

                {/* Category & Name */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest text-taupe uppercase mb-2">
                    {product.category}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-display font-normal text-charcoal mb-2">
                    {product.name}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(product.rating) ? 'text-taupe text-lg' : 'text-stone/30 text-lg'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-charcoal/60">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone/20">
                  <span className="text-3xl font-semibold text-charcoal">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-charcoal/40 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="font-semibold text-charcoal mb-3">Key Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-stone/10 text-sm rounded-full text-charcoal"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-charcoal mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-charcoal/70">
                        <span className="text-taupe">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="mb-8 pb-8 border-b border-stone/20">
                  <h3 className="font-semibold text-charcoal mb-2">How to Use</h3>
                  <p className="text-charcoal/70">{product.instructions}</p>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-charcoal/60">Quantity</span>
                    <div className="flex items-center border border-stone/20 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-stone/10 transition-colors"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="px-6 py-2 text-center w-16">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-stone/10 transition-colors"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart & Wishlist */}
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="flex-1 btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </motion.button>

                    <motion.button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`px-6 py-3 rounded-lg border-2 transition-all ${
                        isWishlisted
                          ? 'bg-taupe border-taupe text-white'
                          : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-cream'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiHeart
                        size={20}
                        fill={isWishlisted ? 'currentColor' : 'none'}
                      />
                    </motion.button>
                  </div>

                  {/* Stock Status */}
                  {product.inStock && (
                    <p className="text-sm text-sage">✓ In Stock - Ships within 1-2 business days</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
