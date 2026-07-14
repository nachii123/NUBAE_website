import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', href: '#' },
        { label: 'Best Sellers', href: '#' },
        { label: 'Collections', href: '#' },
        { label: 'All Products', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Our Story', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Refund Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main Footer */}
      <div className="container-max py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-normal mb-4">NUBAE</h3>
            <p className="text-cream/60 mb-6">
              Premium skincare designed for the modern beauty enthusiast.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 bg-cream/10 hover:bg-taupe rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-cream/60 hover:text-taupe transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 md:my-16 border-t border-cream/10" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-cream/60 text-sm">
            © {currentYear} NUBAE. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <motion.a
              href="#"
              className="text-cream/60 hover:text-taupe transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-cream/60 hover:text-taupe transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Terms & Conditions
            </motion.a>
          </div>

          {/* Payment Methods */}
          <div className="flex gap-3">
            <div className="px-3 py-1 bg-cream/10 rounded text-xs text-cream/60">
              Visa
            </div>
            <div className="px-3 py-1 bg-cream/10 rounded text-xs text-cream/60">
              Mastercard
            </div>
            <div className="px-3 py-1 bg-cream/10 rounded text-xs text-cream/60">
              PayPal
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
