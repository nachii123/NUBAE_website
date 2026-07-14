import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const ShoppingCart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'LUXURY20') {
      setDiscount(subtotal * 0.2);
    } else if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone/20">
              <h2 className="text-2xl font-display font-normal text-charcoal">
                Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone/10 rounded-full transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex gap-4"
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-stone/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-charcoal/60 mb-2">${item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-stone/10 rounded transition-colors"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-stone/10 rounded transition-colors"
                        >
                          <FiPlus size={14} />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto p-1 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-charcoal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-48">
                  <p className="text-charcoal/60 text-center">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Promo Code */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-stone/20">
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-stone/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-taupe"
                  />
                  <motion.button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-taupe text-white rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply
                  </motion.button>
                </div>
                <p className="text-xs text-charcoal/60 mt-2">
                  Try: LUXURY20 or SAVE10
                </p>
              </div>
            )}

            {/* Summary */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-stone/20 space-y-3">
                <div className="flex justify-between text-charcoal/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sage">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-charcoal/60">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg font-semibold text-charcoal pt-3 border-t border-stone/20">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <motion.button
                  className="w-full btn-primary mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
