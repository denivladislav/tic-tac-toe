import { CONSECUTIVE_CELLS_TO_WIN, MIN_NUMBER_OF_MOVES_TO_WIN } from '../const';
import { EGameResults } from './enums';
import { TGameField, TCellArr, TCell, TMove } from './types';
import { IGameResult } from '../slices/gameDataSlice';

export const generateGameField = (gameFieldWidth: number): TGameField => {
  const field = [];
  for (let i = 0; i < gameFieldWidth; i += 1) {
    const row = [];
    for (let j = 0; j < gameFieldWidth; j += 1) {
      row.push({ occupiedByPlayer: null });
    }
    field.push(row);
  }

  return field;
};

const getConsecutiveCells = (cellArr: TCellArr, playerIndex: number) =>
  cellArr.reduce((acc, cell: TCell) => {
    if (acc === CONSECUTIVE_CELLS_TO_WIN) {
      return acc;
    }

    if (cell.occupiedByPlayer === playerIndex) {
      acc += 1;
    } else {
      acc = 0;
    }

    return acc;
  }, 0);

export const getGameResult = (
  moves: TMove[],
  gameField: TGameField,
): IGameResult => {
  const gameFieldLength = gameField.length;

  if (moves.length < MIN_NUMBER_OF_MOVES_TO_WIN) {
    return { result: EGameResults.CONTINUE, playerIndex: 0 };
  }

  const lastMove = moves[moves.length - 1];
  const {
    coords: { row, col },
    playerIndex,
  } = lastMove;

  const checkIsRowWin = () => {
    const currentRow = gameField[row];
    const consecutiveCells = getConsecutiveCells(currentRow, playerIndex);
    return consecutiveCells === CONSECUTIVE_CELLS_TO_WIN;
  };

  const checkIsColWin = () => {
    const currentCol = gameField.reduce((acc, r) => {
      acc.push(r[col]);
      return acc;
    }, []);
    const consecutiveCells = getConsecutiveCells(currentCol, playerIndex);
    return consecutiveCells === CONSECUTIVE_CELLS_TO_WIN;
  };

  const checkIsLeftDiagWin = () => {
    const diff = row - col;
    if (
      diff > gameFieldLength - CONSECUTIVE_CELLS_TO_WIN ||
      diff < CONSECUTIVE_CELLS_TO_WIN - gameFieldLength
    ) {
      return false;
    }

    const leftDiag = gameField.reduce((acc, r, rIndex) => {
      if (r[rIndex - diff]) {
        acc.push(r[rIndex - diff]);
      }
      return acc;
    }, []);

    const consecutiveCells = getConsecutiveCells(leftDiag, playerIndex);
    return consecutiveCells === CONSECUTIVE_CELLS_TO_WIN;
  };

  const checkIsRightDiagWin = () => {
    const sum = row + col;
    if (sum < CONSECUTIVE_CELLS_TO_WIN - 1 || sum > (gameFieldLength - 2) * 2) {
      return false;
    }

    const rightDiag = gameField.reduce((acc, r, rIndex) => {
      if (r[sum - rIndex]) {
        acc.push(r[sum - rIndex]);
      }
      return acc;
    }, []);

    const consecutiveCells = getConsecutiveCells(rightDiag, playerIndex);
    return consecutiveCells === CONSECUTIVE_CELLS_TO_WIN;
  };

  const checkIsDraw = () => moves.length === gameFieldLength ** 2;

  if (
    checkIsRowWin() ||
    checkIsColWin() ||
    checkIsLeftDiagWin() ||
    checkIsRightDiagWin()
  ) {
    return { result: EGameResults.WIN, playerIndex };
  }

  if (checkIsDraw()) {
    return { result: EGameResults.DRAW, playerIndex: 0 };
  }

  return { result: EGameResults.CONTINUE, playerIndex: 0 };
};
