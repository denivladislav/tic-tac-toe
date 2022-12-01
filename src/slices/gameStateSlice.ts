import { createSlice } from '@reduxjs/toolkit';
import { EGameStates, TGameState } from '../helpers/types';

export interface IGameState {
  gameState: TGameState
}

const initialState: IGameState = {
  gameState: EGameStates.LOGIN,
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