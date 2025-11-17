import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await api.get('/api/cart')
  return response.data
})

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }) => {
  const response = await api.post('/api/cart/add', { productId, quantity })
  return response.data
})

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ productId, quantity }) => {
  const response = await api.put('/api/cart/update', { productId, quantity })
  return response.data
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  const response = await api.delete(`/api/cart/remove/${productId}`)
  return response.data
})

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await api.delete('/api/cart/clear')
  return response.data
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []
        state.totalAmount = action.payload.totalAmount || 0
        state.totalItems = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.totalItems = action.payload.items.reduce((sum, item) => sum + item.quantity, 0)
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.totalItems = action.payload.items.reduce((sum, item) => sum + item.quantity, 0)
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.totalItems = action.payload.items.reduce((sum, item) => sum + item.quantity, 0)
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []
        state.totalAmount = 0
        state.totalItems = 0
      })
  }
})

export default cartSlice.reducer