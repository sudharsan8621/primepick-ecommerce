import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const createOrder = createAsyncThunk(
  'orders/createOrder', 
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/orders', orderData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order')
    }
  }
)

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/orders')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [], // Initialize as empty array
    currentOrder: null,
    loading: false,
    error: null
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload
        state.orders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.orders = [] // Ensure orders is always an array
      })
  }
})

export const { clearOrderError } = orderSlice.actions
export default orderSlice.reducer