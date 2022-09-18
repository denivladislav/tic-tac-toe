import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameState: 'login',
  players: [],
  occupiedCells: [],
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
    occupyCell: (state, { payload }) => {
      state.occupiedCells = [...state.occupiedCells, payload];
    },
  },
});

export const { setGameState, addPlayer, occupyCell } = gameDataSlice.actions;

export default gameDataSlice.reducer;
