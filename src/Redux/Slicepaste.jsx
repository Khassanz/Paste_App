import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
 pastes: localStorage.getItem('pastes')
 ? JSON.parse(localStorage.getItem('pastes'))
 : []
}

export const Slicepaste = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem('pastes',JSON.stringify(state.pastes));
      toast.success("paste created successfully")
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success("Paste successfully updated");
      } else {
        toast.error("Paste not found");
      }
    },
    
    resetToPastes: (state, action) => {
      state.pastes =[]
      localStorage.removeItem('pastes')
      toast.remove ("paste are reset")
    },
    removeFromPastes: (state, action) => {
      const pasteid = action.payload; // Assuming payload is the ID
      const index = state.pastes.findIndex(item => item._id === pasteid); // Find the index based on the ID
      
      if (index >= 0) {
        state.pastes.splice(index, 1); // Remove the item from the array
        localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Update local storage
        toast.success("Paste successfully deleted"); // Show success message
      }
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes,removeFromPastes, } = Slicepaste.actions

export default Slicepaste.reducer