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

export const getGameResult = (moves, gameField) => {
  const gameFieldLength = gameField.length;
  const minimumMovesToWin = 2 * gameFieldLength - 1;
  if (moves.length < minimumMovesToWin) {
    return { result: 'continue', playerIndex: null };
  }

  const lastMove = moves[moves.length - 1];
  const {
    coords: { row, col },
    playerIndex,
  } = lastMove;

  const checkIsRowWin = () => {
    const currentRow = gameField[row];

    const isRowWin = !currentRow.find(
      (cell) => cell.occupiedByPlayer !== playerIndex,
    );
    return isRowWin;
  };

  const checkIsColWin = () => {
    const currentCol = gameField.reduce((acc, r) => {
      acc.push(r[col]);
      return acc;
    }, []);

    const isColWin = !currentCol.find(
      (cell) => cell.occupiedByPlayer !== playerIndex,
    );
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

    const isleftDiagWin = !leftDiag.find(
      (cell) => cell.occupiedByPlayer !== playerIndex,
    );
    return isleftDiagWin;
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
    const isRightDiagWin = !rightDiag.find(
      (cell) => cell.occupiedByPlayer !== playerIndex,
    );
    return isRightDiagWin;
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
