// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import api from '../services/api'

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await api.get('/api/products')
//   return response.data
// })

// export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
//   const response = await api.get(`/api/products/${id}`)
//   return response.data
// })

// export const searchProducts = createAsyncThunk('products/searchProducts', async (query) => {
//   const response = await api.get(`/api/products/search?q=${query}`)
//   return response.data
// })

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     currentProduct: null,
//     filteredProducts: [],
//     loading: false,
//     error: null,
//     searchQuery: ''
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload
//       if (action.payload === '') {
//         state.filteredProducts = state.products
//       } else {
//         state.filteredProducts = state.products.filter(product =>
//           product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
//           product.category.toLowerCase().includes(action.payload.toLowerCase())
//         )
//       }
//     },
//     filterByCategory: (state, action) => {
//       if (action.payload === 'all') {
//         state.filteredProducts = state.products
//       } else {
//         state.filteredProducts = state.products.filter(
//           product => product.category === action.payload
//         )
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false
//         state.products = action.payload
//         state.filteredProducts = action.payload
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.currentProduct = action.payload
//       })
//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.filteredProducts = action.payload
//       })
//   }
// })

// export const { setSearchQuery, filterByCategory } = productSlice.actions
// export default productSlice.reducer





























// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import api from '../services/api'

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await api.get('/api/products')
//   return response.data
// })

// export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
//   const response = await api.get(`/api/products/${id}`)
//   return response.data
// })

// export const searchProducts = createAsyncThunk('products/searchProducts', async (query) => {
//   const response = await api.get(`/api/products/search?q=${query}`)
//   return response.data
// })

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     currentProduct: null,
//     filteredProducts: [],
//     loading: false,
//     error: null,
//     searchQuery: '',
//     selectedCategory: 'all'
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload
//       applyFilters(state)
//     },
//     filterByCategory: (state, action) => {
//       state.selectedCategory = action.payload
//       applyFilters(state)
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false
//         state.products = action.payload
//         state.filteredProducts = action.payload
//         applyFilters(state)
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.currentProduct = action.payload
//       })
//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.filteredProducts = action.payload
//       })
//   }
// })

// // Helper function to apply both search and category filters
// const applyFilters = (state) => {
//   let filtered = [...state.products]
  
//   // Apply category filter
//   if (state.selectedCategory && state.selectedCategory !== 'all') {
//     filtered = filtered.filter(product => 
//       product.category.toLowerCase() === state.selectedCategory.toLowerCase()
//     )
//   }
  
//   // Apply search filter
//   if (state.searchQuery) {
//     filtered = filtered.filter(product =>
//       product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
//       product.description?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
//       product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
//     )
//   }
  
//   state.filteredProducts = filtered
// }

// export const { setSearchQuery, filterByCategory } = productSlice.actions
// export default productSlice.reducer
























import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'
import { mockProducts } from '../services/mockData'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/products')
      return response.data
    } catch (error) {
      console.warn('Backend not available, using mock data')
      return mockProducts // Use mock data as fallback
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById', 
  async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`)
      return response.data
    } catch (error) {
      // Fallback to mock data
      const product = mockProducts.find(p => p._id === id)
      if (product) return product
      throw error
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    filteredProducts: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'all'
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      applyFilters(state)
    },
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload
      applyFilters(state)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload || []
        state.filteredProducts = action.payload || []
        applyFilters(state)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        // Use mock data on error
        state.products = mockProducts
        state.filteredProducts = mockProducts
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
  }
})

const applyFilters = (state) => {
  let filtered = [...state.products]
  
  if (state.selectedCategory && state.selectedCategory !== 'all') {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === state.selectedCategory.toLowerCase()
    )
  }
  
  if (state.searchQuery) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
  }
  
  state.filteredProducts = filtered
}

export const { setSearchQuery, filterByCategory } = productSlice.actions
export default productSlice.reducer