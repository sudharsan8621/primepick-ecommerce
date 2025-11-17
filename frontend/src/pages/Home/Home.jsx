import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/productSlice'
import ProductCard from '../../components/ProductCard/ProductCard'
import banner1 from '../../assets/images/banner/banner1.svg'
import banner2 from '../../assets/images/banner/banner2.svg'
import banner3 from '../../assets/images/banner/banner3.svg'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector(state => state.products)
  const [currentBanner, setCurrentBanner] = useState(0)
  
  const banners = [banner1, banner2, banner3]

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  const scrollToProducts = () => {
    document.getElementById('featured-products').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="home">
      <section className="hero-section">
        <div className="carousel">
          {banners.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Banner ${index + 1}`}
              className={`carousel-image ${index === currentBanner ? 'active' : ''}`}
            />
          ))}
        </div>
        
        <div className="carousel-dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1>Welcome to PrimePick</h1>
          <p>Discover Amazing Products at Unbeatable Prices</p>
          <button className="cta-button" onClick={scrollToProducts}>
            Explore Collection
          </button>
        </div>
      </section>

      <section id="featured-products" className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.slice(0, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home