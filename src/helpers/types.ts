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

export type TGameState = keyof typeof EGameStates;

export type TGameResult = keyof typeof EGameResults;

export type TCell = { occupiedByPlayer: number | null };
export type TCellArr = TCell[];
export type TGameField = TCell[][];
export type TCoords = { row: number, col: number };

export interface IMove {
  coords: TCoords,
  playerIndex: number,
}

export interface IGameResult {
  result: TGameResult,
  playerIndex: number | null,
}

export interface IGameData {
  players: string[],
  currentPlayerIndex: number,
  gameField: TGameField,
  moves: IMove[],
  gameResult: IGameResult,
}