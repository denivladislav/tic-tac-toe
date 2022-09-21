import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import Cell from './Cell.jsx';

const ROW_PREFIX = 'row';
const CELL_PREFIX = 'col';

const GameField = () => {
  const gameField = useSelector((state) => state.gameData.gameField);

  const renderGameFieldRow = (row, rowIndex, rowId) => (
    <>
      {row.map((_, colIndex) => {
        const cellId = `${rowId}-${CELL_PREFIX}${colIndex}`;
        const coords = { row: rowIndex, col: colIndex };
        return <Cell cellId={cellId} coords={coords} key={cellId} />;
      })}
    </>
  );

  return (
    <Container>
      <Table bordered size="sm">
        <tbody>
          {gameField.map((row, rowIndex) => {
            const rowId = `${ROW_PREFIX}${rowIndex}`;
            return (
              <tr id={rowId} key={rowId}>
                {renderGameFieldRow(row, rowIndex, rowId)}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default GameField;
