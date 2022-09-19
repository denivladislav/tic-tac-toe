import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import cn from 'classnames';
import { MAX_WIDTH_OF_GAME_FIELD } from '../const.js';
import { occupyCell, changePlayer } from '../slices/gameDataSlice.js';

import '../assets/css/style.css';
import cross from '../assets/images/cross.png';
import circle from '../assets/images/circle.png';

const rowPrefix = 'row';
const cellPrefix = 'col';

const cellContentSharedClasses = 'w-100 h-100';

const Cell = ({ cellId }) => {
  const dispatch = useDispatch();

  const occupiedCells = useSelector((state) => state.gameData.occupiedCells);
  const currentCell = occupiedCells.find((occupiedCell) => occupiedCell.cellId === cellId);
  const isCellOccupied = Boolean(currentCell);

  const currentPlayerIndex = useSelector((state) => state.gameData.currentPlayerIndex);

  const handleClick = () => {
    if (isCellOccupied) {
      return;
    }
    dispatch(occupyCell({ cellId, currentPlayerIndex }));
    dispatch(changePlayer());
  };

  const renderCellContent = () => {
    if (!isCellOccupied) {
      return (
        <button className={cn(cellContentSharedClasses, 'cell-button')} type="button" aria-label="cell" onClick={handleClick} />
      );
    }

    if (currentCell.currentPlayerIndex === 0) {
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

const renderGameFieldRow = (rowId) => (
  <>
    {[...Array(MAX_WIDTH_OF_GAME_FIELD).keys()].map((colId) => {
      const cellId = `${rowId}-${cellPrefix}${colId}`;

      return <Cell cellId={cellId} key={cellId} />;
    })}
  </>
);

const GameField = () => (
  <Table bordered size="sm">
    <tbody>
      {[...Array(MAX_WIDTH_OF_GAME_FIELD).keys()].map((key) => {
        const rowId = `${rowPrefix}${key}`;

        return (
          <tr id={rowId} key={rowId}>
            {renderGameFieldRow(rowId)}
          </tr>
        );
      })}
    </tbody>
  </Table>
);

const GameBox = () => (
  <Container className="game-field-container">
    <GameField />
  </Container>
);

export default GameBox;
