import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: localStorage.getItem('darkMode') === 'true'
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('darkMode', state.isDarkMode)
    },
    loadTheme: (state) => {
      state.isDarkMode = localStorage.getItem('darkMode') === 'true'
    }
  }
})

export const { toggleTheme, loadTheme } = themeSlice.actions
export default themeSlice.reducer