import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, setSearchQuery, filterByCategory } from '../../redux/productSlice'
import ProductCard from '../../components/ProductCard/ProductCard'
import { FiSearch, FiFilter } from 'react-icons/fi'
import './Products.css'

const Products = () => {
  const dispatch = useDispatch()
  const { filteredProducts, loading, searchQuery } = useSelector(state => state.products)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    dispatch(setSearchQuery(value))
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value
    setCategory(value)
    dispatch(filterByCategory(value))
  }

  const categories = ['all', 'electronics', 'fashion', 'home', 'books', 'sports']

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        
        <div className="filters-section">
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          
          <div className="category-filter">
            <FiFilter />
            <select value={category} onChange={handleCategoryChange}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="products-container">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products