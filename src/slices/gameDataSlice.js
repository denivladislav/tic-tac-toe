import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameStatus: 'player1login',
};

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    setGameStatus: (state, { payload }) => {
      state.gameStatus = payload;
    },
  },
});

export const { setGameStatus } = gameDataSlice.actions;

export default gameDataSlice.reducer;
