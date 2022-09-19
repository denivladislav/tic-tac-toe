import { createSlice } from '@reduxjs/toolkit';
import { generateGameField } from '../utils/utils.js';

const initialState = {
  gameState: 'login',
  players: [],
  currentPlayerIndex: 0,
  gameField: generateGameField(),
  moves: [],
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
      const { coords, currentPlayerIndex } = payload;
      const { row, col } = coords;

      const currentCell = state.gameField[row][col];
      currentCell.occupiedByPlayer = currentPlayerIndex;

      const move = { coords, playerIndex: currentPlayerIndex };
      state.moves = [...state.moves, move];
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
