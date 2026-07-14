import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, onSelect }) => {
  return (
    <motion.button
      onClick={() => onSelect(category)}
      className="group relative overflow-hidden rounded-lg h-40 md:h-48 lg:h-56"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <motion.img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.h3
          className="text-xl md:text-2xl font-display font-normal text-white text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {category.name}
        </motion.h3>
      </div>
    </motion.button>
  );
};

export default CategoryCard;
