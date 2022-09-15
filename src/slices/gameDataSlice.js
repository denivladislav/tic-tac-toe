import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameState: 'login',
  players: [],
};

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    setGameState: (state, { payload }) => {
      state.gameState = payload;
    },
    addPlayer: (state, { payload }) => {
      state.players = [...state.players, payload];
    },
  },
});

export const { setGameState, addPlayer } = gameDataSlice.actions;

export default gameDataSlice.reducer;
