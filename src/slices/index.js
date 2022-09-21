import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from './gameStateSlice.js';
import gameDataReducer from './gameDataSlice.js';
import modalReducer from './modalSlice.js';

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    gameData: gameDataReducer,
    modalInfo: modalReducer,
  },
});

export default store;
