import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="pt-32 pb-8 md:pt-24 md:pb-16 lg:pt-20 lg:pb-0 relative overflow-hidden bg-gradient-to-br from-cream via-cream to-stone/10">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen lg:min-h-96">
          {/* Left Content */}
          <motion.div
            className="space-y-8 z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-normal leading-tight text-charcoal"
              variants={itemVariants}
            >
              When Beauty Becomes Ritual
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              Discover our luxury skincare collection designed for the modern, mindful beauty enthusiast. Every product crafted with intention.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex gap-4 pt-4" variants={itemVariants}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div className="flex items-center gap-6 pt-8" variants={itemVariants}>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-stone to-beige border-2 border-cream"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-taupe">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-charcoal/60">1,200+ Trusted Customers</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative h-96 md:h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone/20 to-sage/20 rounded-3xl" />

            {/* Main Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1748639320154-6ba118bccc74?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury skincare product"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-white/40 backdrop-blur-md rounded-full shadow-lg p-4"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-full h-full bg-gradient-to-br from-taupe/30 to-sage/30 rounded-full" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/40 backdrop-blur-md rounded-full shadow-lg"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
