export enum EGameStates {
  LOGIN = 'LOGIN',
  PICK_GAMEFIELD_WIDTH = 'PICK_GAMEFIELD_WIDTH',
  GAME_RUNNING = 'GAME_RUNNING',
}

export type TGameState = keyof typeof EGameStates;
