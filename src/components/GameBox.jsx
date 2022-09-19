import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { occupyCell, changePlayer, setGameState } from '../slices/gameDataSlice.js';
import { checkGameResult } from '../utils/utils.js';

import '../assets/css/style.css';
import cross from '../assets/images/cross.png';
import circle from '../assets/images/circle.png';

const rowPrefix = 'row';
const cellPrefix = 'col';

const cellContentSharedClasses = 'w-100 h-100';

const Cell = ({ cellId, coords }) => {
  const dispatch = useDispatch();
  const gameField = useSelector((state) => state.gameData.gameField);
  const currentPlayerIndex = useSelector((state) => state.gameData.currentPlayerIndex);

  const { row, col } = coords;
  const currentCell = gameField[row][col];
  const isCellOccupied = currentCell.occupiedByPlayer !== null;

  const handleClick = () => {
    if (isCellOccupied) {
      return;
    }
    dispatch(occupyCell({ coords, currentPlayerIndex }));
    dispatch(changePlayer());
  };

  const renderCellContent = () => {
    if (!isCellOccupied) {
      return (
        <button className={cn(cellContentSharedClasses, 'cell-button')} type="button" aria-label="cell" onClick={handleClick} />
      );
    }

    if (currentCell.occupiedByPlayer === 0) {
      return (
        <img className={cn(cellContentSharedClasses)} src={cross} alt="cross" />
      );
    }

    return (
      <img className={cn(cellContentSharedClasses)} src={circle} alt="circle" />
    );
  };

  return (
    <td className="p-0 cell" id={cellId}>
      <div className="cell-content">
        {renderCellContent()}
      </div>
    </td>
  );
};

const renderGameFieldRow = (row, rowIndex, rowId) => (
  <>
    {row.map((_, colIndex) => {
      const cellId = `${rowId}-${cellPrefix}${colIndex}`;
      const coords = { row: rowIndex, col: colIndex };
      return <Cell cellId={cellId} coords={coords} key={cellId} />;
    })}
  </>
);

const GameField = () => {
  const gameField = useSelector((state) => state.gameData.gameField);

  return (
    <Table bordered size="sm">
      <tbody>
        {gameField.map((row, rowIndex) => {
          const rowId = `${rowPrefix}${rowIndex}`;

          return (
            <tr id={rowId} key={rowId}>
              {renderGameFieldRow(row, rowIndex, rowId)}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const GameBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentPlayerIndex = useSelector((state) => state.gameData.currentPlayerIndex);
  const gameField = useSelector((state) => state.gameData.gameField);
  const moves = useSelector((state) => state.gameData.moves);
  const lastMove = moves[moves.length - 1];

  useEffect(() => {
    const hasGameEnded = checkGameResult(lastMove, gameField);
    if (hasGameEnded) {
      dispatch(setGameState('gameEnd'));
    }
  }, [currentPlayerIndex]);

  return (
    // <h3>{t('current')}</h3>
    <Container className="game-field-container">
      <GameField />
    </Container>
  );
};

export default GameBox;
