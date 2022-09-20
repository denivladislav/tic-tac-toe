import { MAX_WIDTH_OF_GAME_FIELD } from '../const.js';

export const generateGameField = () => {
  const field = [];
  for (let i = 0; i < MAX_WIDTH_OF_GAME_FIELD; i += 1) {
    const row = [];
    for (let j = 0; j < MAX_WIDTH_OF_GAME_FIELD; j += 1) {
      row.push({ occupiedByPlayer: null });
    }
    field.push(row);
  }

  return field;
};

export const checkGameResult = (moves, gameField) => {
  const lastMove = moves[moves.length - 1];
  if (!lastMove) {
    return;
  }
  const { coords: { row, col }, playerIndex } = lastMove;

  const checkIsRowWin = () => {
    const currentRow = gameField[row];

    const isRowWin = !currentRow.find((cell) => cell.occupiedByPlayer !== playerIndex);
    return isRowWin;
  };

  const checkIsColWin = () => {
    const currentCol = gameField.reduce((acc, r) => {
      acc.push(r[col]);
      return acc;
    }, []);

    const isColWin = !currentCol.find((cell) => cell.occupiedByPlayer !== playerIndex);
    return isColWin;
  };

  const checkIsLeftDiagWin = () => {
    if (row !== col) {
      return false;
    }

    const leftDiag = gameField.reduce((acc, r, rIndex) => {
      acc.push(r[rIndex]);
      return acc;
    }, []);

    const isleftDiagWin = !leftDiag.find((cell) => cell.occupiedByPlayer !== playerIndex);
    return isleftDiagWin;
  };

  const checkIsRightDiagWin = () => {
    const righDiagCoordSum = MAX_WIDTH_OF_GAME_FIELD - 1;
    if (row + col !== righDiagCoordSum) {
      return false;
    }

    const rightDiag = gameField.reduce((acc, r, rIndex) => {
      acc.push(r[righDiagCoordSum - rIndex]);
      return acc;
    }, []);
    const isRightDiagWin = !rightDiag.find((cell) => cell.occupiedByPlayer !== playerIndex);
    return isRightDiagWin;
  };

  const checkIsDraw = () => moves.length === MAX_WIDTH_OF_GAME_FIELD ** 2;

  if (checkIsRowWin() || checkIsColWin() || checkIsLeftDiagWin()
    || checkIsRightDiagWin() || checkIsDraw()) {
    return true;
  }
};
