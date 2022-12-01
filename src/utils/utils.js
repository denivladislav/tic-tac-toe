import {
  CONSECUTIVE_CELLS_TO_WIN,
  MIN_NUMBER_OF_MOVES_TO_WIN,
} from '../const.ts';

export const generateGameField = (gameFieldWidth) => {
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

const getConsecutiveCells = (arr, playerIndex) => arr.reduce((acc, cell) => {
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

export const getGameResult = (moves, gameField) => {
  const gameFieldLength = gameField.length;

  if (moves.length < MIN_NUMBER_OF_MOVES_TO_WIN) {
    return { result: 'continue', playerIndex: null };
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
    if (row !== col) {
      return false;
    }

    const leftDiag = gameField.reduce((acc, r, rIndex) => {
      acc.push(r[rIndex]);
      return acc;
    }, []);
    const consecutiveCells = getConsecutiveCells(leftDiag, playerIndex);
    return consecutiveCells === CONSECUTIVE_CELLS_TO_WIN;
  };

  const checkIsRightDiagWin = () => {
    const righDiagCoordSum = gameFieldLength - 1;
    if (row + col !== righDiagCoordSum) {
      return false;
    }

    const rightDiag = gameField.reduce((acc, r, rIndex) => {
      acc.push(r[righDiagCoordSum - rIndex]);
      return acc;
    }, []);
    const consecutiveCells = getConsecutiveCells(rightDiag, playerIndex);
    return consecutiveCells === CONSECUTIVE_CELLS_TO_WIN;
  };

  const checkIsDraw = () => moves.length === gameFieldLength ** 2;

  if (
    checkIsRowWin()
    || checkIsColWin()
    || checkIsLeftDiagWin()
    || checkIsRightDiagWin()
  ) {
    return { result: 'win', playerIndex };
  }

  if (checkIsDraw()) {
    return { result: 'draw', playerIndex: null };
  }

  return { result: 'continue', playerIndex: null };
};
