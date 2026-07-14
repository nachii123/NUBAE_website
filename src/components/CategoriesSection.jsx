import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { categories } from '../data/products';

const CategoriesSection = ({ onCategorySelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-max">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-normal text-charcoal mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-charcoal/60">
            Click on any category to view all products
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onCategorySelect}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
