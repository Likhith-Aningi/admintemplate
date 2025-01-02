import { configureStore } from '@reduxjs/toolkit';
import reducer from './slice'; 

const store = configureStore({
  reducer: {
    store: reducer, 
  },
});

export default store;
