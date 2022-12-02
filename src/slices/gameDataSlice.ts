import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EGameResults } from '../helpers/enums';
import { TMove, TCoords, TGameField, TGameResult } from '../helpers/types';
import { generateGameField } from '../utils/utils';

export interface IGameResult {
  result: TGameResult,
  playerIndex: number | null,
}

interface IGameData {
  players: string[],
  currentPlayerIndex: number,
  gameField: TGameField,
  moves: TMove[],
  gameResult: IGameResult,
}

export const initialState: IGameData = {
  players: [],
  currentPlayerIndex: 0,
  gameField: [],
  moves: [],
  gameResult: { result: EGameResults.NULL, playerIndex: null },
};

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    addPlayer: (state, { payload }: PayloadAction<string>) => {
      state.players = [...state.players, payload];
    },
    pickGameFieldWidth: (state, { payload }: PayloadAction<number>) => {
      state.gameField = generateGameField(payload);
    },
    occupyCell: (state, { payload }: PayloadAction<{ coords: TCoords, currentPlayerIndex: number }>) => {
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
    addResult: (state, { payload }: PayloadAction<IGameResult>) => {
      state.gameResult = payload;
    },
    undoLastMove: (state) => {
      const { moves } = state;
      const lastMove = moves[moves.length - 1];
      const {
        coords: { row, col },
        playerIndex,
      } = lastMove;
      state.gameField[row][col].occupiedByPlayer = null;
      state.moves = state.moves.slice(0, moves.length - 1);
      state.currentPlayerIndex = playerIndex;
    },
    restartGame: (state) => {
      const prevFirstPlayer = state.moves[0].playerIndex;
      const newFirstPlayer = prevFirstPlayer === 0 ? 1 : 0;
      return {
        ...initialState,
        players: state.players,
        currentPlayerIndex: newFirstPlayer,
        gameField: generateGameField(state.gameField.length),
      };
    },
    leaveGame: () => ({ ...initialState }),
  },
});

export const {
  addPlayer,
  occupyCell,
  swapPlayers,
  addResult,
  restartGame,
  leaveGame,
  undoLastMove,
  pickGameFieldWidth,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
