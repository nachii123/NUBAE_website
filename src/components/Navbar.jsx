import React, { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = ({ onCartClick, cartCount, onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', href: '#shop' },
    { label: 'Categories', href: '#categories' },
    { label: 'New Arrivals', href: '#new' },
    { label: 'Best Sellers', href: '#bestsellers' },
    { label: 'Our Story', href: '#story' },
  ];

  return (
    <motion.nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg'
          : 'bg-cream/50 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-max py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <svg
              width="180"
              height="48"
              viewBox="0 0 220 60"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-auto"
              role="img"
              aria-label="NUBAE"
            >
              <circle cx="30" cy="30" r="18" fill="#C9A46A" />
              <path
                d="M22 30C22 24 27 19 33 19C35 19 37 20 39 21C36 21 33 23 33 27C33 31 36 33 39 33C37 39 32 41 27 41C24 38 22 35 22 30Z"
                fill="white"
              />
              <text
                x="60"
                y="37"
                fontFamily="Cormorant Garamond, serif"
                fontSize="28"
                fill="#2B2B2B"
                letterSpacing="3"
              >
                NUBAE
              </text>
            </svg>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-sm tracking-wide text-charcoal hover:text-taupe transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <motion.button
              onClick={onSearchClick}
              className="hover:text-taupe transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSearch size={20} />
            </motion.button>

            <motion.button
              className="hover:text-taupe transition-colors hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHeart size={20} />
            </motion.button>

            <motion.button
              className="hover:text-taupe transition-colors hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser size={20} />
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={onCartClick}
              className="relative hover:text-taupe transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-charcoal text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-4 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm tracking-wide text-charcoal hover:text-taupe"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
