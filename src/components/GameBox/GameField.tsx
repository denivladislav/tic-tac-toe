import React from 'react';
import { Table, Container } from 'react-bootstrap';
import Cell from './Cell';
import { useAppSelector } from '../../helpers/hooks';
import { TCellArr } from '../../helpers/types';

const ROW_PREFIX = 'row';
const CELL_PREFIX = 'col';

const GameField = (): JSX.Element => {
  const gameField = useAppSelector((state) => state.gameData.gameField);

  const renderGameFieldRow = (
    row: TCellArr,
    rowIndex: number,
    rowId: string,
  ): JSX.Element => (
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
