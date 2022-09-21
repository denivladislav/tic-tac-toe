import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameState: 'login',
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameState: (state, { payload }) => {
      state.gameState = payload;
    },
  },
});

export const { setGameState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
