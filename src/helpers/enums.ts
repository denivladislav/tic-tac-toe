export enum EGameStates {
  LOGIN = 'LOGIN',
  PICK_GAMEFIELD_WIDTH = 'PICK_GAMEFIELD_WIDTH',
  GAME_RUNNING = 'GAME_RUNNING',
}

export enum EGameResults {
  NULL = 'NULL',
  WIN = 'WIN',
  DRAW = 'DRAW',
  CONTINUE = 'CONTINUE',
}

export enum EModalTypes {
  NULL = 'NULL',
  LEAVE_GAME = 'LEAVE_GAME',
  GAME_OVER = 'GAME_OVER',
}

export enum EActiveModalTypes {
  LEAVE_GAME = 'LEAVE_GAME',
  GAME_OVER = 'GAME_OVER',
}
