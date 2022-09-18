import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { MAX_WIDTH_OF_GAME_FIELD } from '../const.js';
import cn from 'classnames';
import { occupyCell } from '../slices/gameDataSlice.js';

import '../assets/css/style.css';

const rowPrefix = 'row';
const cellPrefix = 'col';

const Cell = ({ cellId }) => {
  const dispatch = useDispatch();
  const occupiedCells = useSelector((state) => state.gameData.occupiedCells);

  const handleClick = () => {
    if (occupiedCells.includes(cellId)) {
      return;
    }
    // alert('clicked!');
    dispatch(occupyCell(cellId));
  };

  return (
    <td className="p-0 cell" id={cellId}>
      <div className="cell-content">
        <button className="w-100 h-100 cell-button" type="button" aria-label="cell" onClick={handleClick} />
      </div>
    </td>
  );
};

const getGameFieldRow = (rowId) => (
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
            {getGameFieldRow(rowId)}
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
