import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  langId: 10,
  activeAgents: [],
  polygonData: '',
  sidebarShow: true, // For sidebar visibility
  theme: 'light',    // For theme management
};

const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setLangId: (state, action) => {
      state.langId = action.payload; // Set langId with the payload
    },
    setStateId: (state, action) => {
      state.stateId = action.payload; // Set langId with the payload
    },
    setDistId: (state, action) => {
      state.distId = action.payload; // Set langId with the payload
    },
    setMandalId: (state, action) => {
      state.mandalId = action.payload; // Set langId with the payload
    },
    setVillageId: (state, action) => {
      state.villageId = action.payload; // Set langId with the payload
    },
    setActiveAgents: (state, action) => {
      state.activeAgents = action.payload; // Set activeAgents with the payload
    },
    setPolygonData: (state, action) => {
      state.polygonData = action.payload; // Set polygonData with the payload
    },
    toggleSidebar: (state, action) => {
      state.sidebarShow = action.payload; // Set sidebar visibility
    },
    setTheme: (state, action) => {
      state.theme = action.payload; // Set theme
    },
    toggleSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload
    }
  },
});

// Export the actions to use them in components
export const { setLangId, setActiveAgents, setPolygonData, toggleSidebar, setTheme, toggleSidebarUnfoldable, setDistId, setMandalId, setStateId, setVillageId } = slice.actions;

// Export the reducer to be added to the store
export default slice.reducer;
