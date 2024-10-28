import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './Redux/Slicepaste'
export const store = configureStore({
  reducer:  {
    Paste: PasteReducer,
    
  },
})