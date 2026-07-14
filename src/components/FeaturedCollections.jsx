import React from 'react';
import { motion } from 'framer-motion';
import { collections } from '../data/products';

const FeaturedCollections = () => {
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
            Featured Collections
          </h2>
          <p className="text-lg text-charcoal/60">
            Curated selections for every skincare journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg h-80 md:h-96 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Background Image */}
              <motion.img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-display font-normal text-white mb-3">
                    {collection.name}
                  </h3>
                  <p className="text-white/80 mb-6 text-lg">{collection.description}</p>
                  <motion.button
                    className="inline-block px-6 py-3 bg-white text-charcoal font-semibold rounded-lg hover:bg-taupe hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Collection
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
