import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { occupyCell, changePlayer } from '../../slices/gameDataSlice.js';

import '../../assets/css/style.css';
import PLAYER_STYLE_MAP from './const.js';

const CELL_CONTENT_SHARED_CLASSES = 'w-100 h-100';

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
      const { color } = PLAYER_STYLE_MAP[currentPlayerIndex];
      return (
        <button className={cn(CELL_CONTENT_SHARED_CLASSES, 'cell-button', `cell-button-${color}`)} type="button" aria-label="cell" onClick={handleClick} />
      );
    }
    const { img, alt } = PLAYER_STYLE_MAP[currentCell.occupiedByPlayer];
    return <img className={CELL_CONTENT_SHARED_CLASSES} src={img} alt={alt} />;
  };

  return (
    <td className="p-0 cell" id={cellId}>
      <div className="cell-content">
        {renderCellContent()}
      </div>
    </td>
  );
};

export default Cell;
