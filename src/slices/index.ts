import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from './gameStateSlice';
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

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const setupStore = (preloadedState: RootState) => configureStore({
  reducer,
  preloadedState,
});
