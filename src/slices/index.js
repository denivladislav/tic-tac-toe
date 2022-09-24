import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from './gameStateSlice.js';
import gameDataReducer from './gameDataSlice.js';
import modalReducer from './modalSlice.js';

const reducer = {
  gameState: gameStateReducer,
  gameData: gameDataReducer,
  modalInfo: modalReducer,
};

const store = configureStore({
  reducer,
});

export const setupStore = (preloadedState) => configureStore({
  reducer,
  preloadedState,
});

export default store;
