import { EGameStates, EGameResults, EModalTypes } from './enums';

export type TGameState = keyof typeof EGameStates;

export type TGameResult = keyof typeof EGameResults;

export type TModalType = keyof typeof EModalTypes;

export type TCell = { occupiedByPlayer: number | null };
export type TCellArr = TCell[];
export type TGameField = TCell[][];

export type TCoords = { row: number, col: number };

export type TMove = { coords: TCoords, playerIndex: number };
