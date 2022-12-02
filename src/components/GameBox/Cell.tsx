import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { occupyCell, swapPlayers } from '../../slices/gameDataSlice';
import { TCoords } from '../../helpers/types';
import { useAppSelector } from '../../helpers/hooks';

import PLAYER_STYLE_MAP from './const';

const Cell = ({
  cellId,
  coords,
}: {
  cellId: string;
  coords: TCoords;
}): JSX.Element => {
  const dispatch = useDispatch();
  const gameField = useAppSelector((state) => state.gameData.gameField);
  const currentPlayerIndex = useAppSelector(
    (state) => state.gameData.currentPlayerIndex,
  );

  const { row, col } = coords;
  const currentCell = gameField[row][col];
  const isCellOccupied = currentCell.occupiedByPlayer !== null;

  const handleClick = () => {
    if (isCellOccupied) {
      return;
    }
    dispatch(occupyCell({ coords, currentPlayerIndex }));
    dispatch(swapPlayers());
  };

  const renderCellContent = () => {
    if (!isCellOccupied) {
      const { color } = PLAYER_STYLE_MAP[currentPlayerIndex];
      return (
        <button
          className={cn(
            'w-100',
            'h-100',
            'cell-button',
            `cell-button-${color}`,
          )}
          data-testid={cellId}
          type="button"
          onClick={handleClick}
          aria-label="empty cell"
        />
      );
    }
    const { img, alt } = PLAYER_STYLE_MAP[currentCell.occupiedByPlayer!];
    return <img className="image" src={img} alt={alt} />;
  };

  return (
    <td className="p-0 cell border-2" id={cellId}>
      <div className="cell-content">{renderCellContent()}</div>
    </td>
  );
};

export default Cell;
