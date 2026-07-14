import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoriesSection from './components/CategoriesSection'
import ProductGrid from './components/ProductGrid'
import Filters from './components/Filters'
import FeaturedCollections from './components/FeaturedCollections'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ProductDetailModal from './components/ProductDetailModal'
import CategoryModal from './components/CategoryModal'
import ShoppingCart from './components/ShoppingCart'
import { products } from './data/products'
import './App.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const [filters, setFilters] = useState({
    category: [],
    price: [0, 150],
    skinType: [],
    rating: 0,
  })

  // Filter and sort products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false
      }

      // Price filter
      if (product.price < filters.price[0] || product.price > filters.price[1]) {
        return false
      }

      // Skin type filter
      if (filters.skinType.length > 0) {
        const hasMatchingSkinType = filters.skinType.some(type =>
          product.skinType.includes(type)
        )
        if (!hasMatchingSkinType) {
          return false
        }
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      return true
    })
  }, [filters])

  const handleQuickView = (product) => {
    setSelectedProduct(product)
  }

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setIsCategoryModalOpen(true)
  }

  return (
    <>
      <Navbar 
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchClick={() => {}}
      />
      
      <Hero />
      
      <CategoriesSection onCategorySelect={handleCategorySelect} />
      
      <section id="shop" className="min-h-screen bg-cream">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Fixed Filter Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-72 lg:flex-shrink-0 bg-white border-r border-stone/20 p-6">
            <div className="sticky top-0">
              <Filters onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Products Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Toggle for Mobile/Tablet */}
            <div className="lg:hidden p-4 md:p-6 bg-white border-b border-stone/20">
              <details className="cursor-pointer">
                <summary className="font-semibold text-charcoal flex items-center justify-between">
                  Filters & Sorting
                  <span className="ml-2">▼</span>
                </summary>
                <div className="mt-4 p-4 bg-cream rounded-lg">
                  <Filters onFiltersChange={setFilters} />
                </div>
              </details>
            </div>

            {/* Scrollable Products Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                <ProductGrid 
                  products={filteredProducts}
                  onQuickView={handleQuickView}
                  onAddToCart={handleAddToCart}
                  isCarousel={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedCollections />
      
      <Testimonials />
      
      <Newsletter />
      
      <Footer />
      
      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={selectedCategory}
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
      />
      
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
    </>
  )
}

export default App
