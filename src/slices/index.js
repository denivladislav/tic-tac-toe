import { configureStore } from '@reduxjs/toolkit';
import gameDataReducer from './gameDataSlice.js';

const store = configureStore({
  reducer: {
    gameData: gameDataReducer,
  },
});

export default store;
