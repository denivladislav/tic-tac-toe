import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameState: 'login',
  players: [],
  currentPlayerIndex: 0,
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
      console.log('payload', payload);
      state.occupiedCells = [...state.occupiedCells, payload];
    },
    changePlayer: (state) => {
      if (state.currentPlayerIndex === 0) {
        state.currentPlayerIndex = 1;
      } else {
        state.currentPlayerIndex = 0;
      }
    },
  },
});

export const {
  setGameState, addPlayer, occupyCell, changePlayer,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
