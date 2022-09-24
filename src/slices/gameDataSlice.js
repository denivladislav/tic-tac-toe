import { createSlice } from '@reduxjs/toolkit';
import { generateGameField } from '../utils/utils.js';

export const initialState = {
  players: [],
  currentPlayerIndex: 0,
  gameField: generateGameField(),
  moves: [],
  gameResult: { result: null, playerIndex: null },
};

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    addPlayer: (state, { payload }) => {
      state.players = [...state.players, payload];
    },
    occupyCell: (state, { payload }) => {
      const { coords, currentPlayerIndex } = payload;
      const { row, col } = coords;

      const currentCell = state.gameField[row][col];
      currentCell.occupiedByPlayer = currentPlayerIndex;

      const move = { coords, playerIndex: currentPlayerIndex };
      state.moves = [...state.moves, move];
    },
    swapPlayers: (state) => {
      if (state.currentPlayerIndex === 0) {
        state.currentPlayerIndex = 1;
      } else {
        state.currentPlayerIndex = 0;
      }
    },
    addResult: (state, { payload }) => {
      state.gameResult = payload;
    },
    restartGame: (state) => ({
      ...initialState,
      players: state.players,
      currentPlayerIndex: state.currentPlayerIndex,
    }),
    leaveGame: () => ({ ...initialState }),
  },
});

export const {
  addPlayer, occupyCell, swapPlayers, addResult, restartGame, leaveGame,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
