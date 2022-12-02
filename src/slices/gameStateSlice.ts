import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TGameState } from '../helpers/types';
import { EGameStates } from '../helpers/enums';

interface IGameState {
  gameState: TGameState,
}

const initialState: IGameState = {
  gameState: EGameStates.LOGIN,
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameState: (state, { payload }: PayloadAction<TGameState>) => {
      state.gameState = payload;
    },
  },
});

export const { setGameState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
