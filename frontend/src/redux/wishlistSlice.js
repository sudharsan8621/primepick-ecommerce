import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/wishlist')
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist', 
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/wishlist/add', { productId })
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist', 
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/wishlist/remove/${productId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [], // Ensure it's always an array
    loading: false,
    error: null
  },
  reducers: {
    clearWishlistError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload?.products || []
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.items = [] // Ensure items is always an array
      })
      // Add to Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload?.products || []
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload?.products || []
      })
  }
})

export const { clearWishlistError } = wishlistSlice.actions
export default wishlistSlice.reducer