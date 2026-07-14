import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Filters = ({ onFiltersChange }) => {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    skinType: false,
    rating: false,
  });

  const [filters, setFilters] = useState({
    category: [],
    price: [0, 150],
    skinType: [],
    rating: 0,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (type, value) => {
    let newFilters = { ...filters };

    if (type === 'category' || type === 'skinType') {
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
    } else if (type === 'rating') {
      newFilters.rating = newFilters.rating === value ? 0 : value;
    } else if (type === 'price') {
      newFilters.price = value;
    }

    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-stone/20 py-6">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between text-charcoal hover:text-taupe transition-colors"
      >
        <h3 className="font-semibold text-sm tracking-wide uppercase">{title}</h3>
        <motion.div
          animate={{ rotate: openSections[section] ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown size={18} />
        </motion.div>
      </button>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: openSections[section] ? 1 : 0,
          height: openSections[section] ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-3">{children}</div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      className="w-full lg:w-64 bg-white rounded-lg p-6 h-fit"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-xl font-display font-normal text-charcoal mb-6">
        Filters
      </h2>

      {/* Category Filter */}
      <FilterSection title="Category" section="category">
        {[
          'Face Serums',
          'Moisturizers',
          'Cleansers',
          'Face Masks',
          'Night Care',
        ].map((cat) => (
          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleFilterChange('category', cat)}
              className="w-4 h-4 accent-taupe"
            />
            <span className="text-sm text-charcoal group-hover:text-taupe transition-colors">
              {cat}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="150"
            value={filters.price[1]}
            onChange={(e) =>
              handleFilterChange('price', [filters.price[0], parseInt(e.target.value)])
            }
            className="w-full accent-taupe"
          />
          <div className="flex justify-between text-sm text-charcoal/60">
            <span>${filters.price[0]}</span>
            <span>${filters.price[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Skin Type Filter */}
      <FilterSection title="Skin Type" section="skinType">
        {['All Skin Types', 'Oily', 'Dry', 'Sensitive', 'Combination'].map((type) => (
          <label key={type} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.skinType.includes(type)}
              onChange={() => handleFilterChange('skinType', type)}
              className="w-4 h-4 accent-taupe"
            />
            <span className="text-sm text-charcoal group-hover:text-taupe transition-colors">
              {type}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Rating" section="rating">
        {[5, 4, 3].map((rating) => (
          <label key={rating} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === rating}
              onChange={() => handleFilterChange('rating', rating)}
              className="w-4 h-4 accent-taupe"
            />
            <div className="flex gap-1">
              {[...Array(rating)].map((_, i) => (
                <span key={i} className="text-taupe text-sm">
                  ★
                </span>
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <span key={i} className="text-stone/30 text-sm">
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-charcoal/60">& Up</span>
          </label>
        ))}
      </FilterSection>

      {/* Reset Button */}
      <motion.button
        onClick={() => {
          setFilters({
            category: [],
            price: [0, 150],
            skinType: [],
            rating: 0,
          });
          onFiltersChange({
            category: [],
            price: [0, 150],
            skinType: [],
            rating: 0,
          });
        }}
        className="w-full mt-6 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 rounded-lg text-sm font-semibold"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Reset Filters
      </motion.button>
    </motion.div>
  );
};

export default Filters;
