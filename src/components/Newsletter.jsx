import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 md:py-32 bg-charcoal text-cream">
      <div className="container-max">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-normal mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the NUBAE Community
          </motion.h2>

          <motion.p
            className="text-lg text-cream/70 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Receive exclusive offers, skincare tips, and early access to new collections
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-taupe"
              required
            />
            <motion.button
              type="submit"
              className="px-8 py-4 bg-taupe text-white font-semibold rounded-lg hover:bg-stone transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {submitted ? 'Subscribed! ✓' : 'Subscribe'}
            </motion.button>
          </motion.form>

          <motion.p
            className="text-sm text-cream/50 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            We respect your privacy. Unsubscribe anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
