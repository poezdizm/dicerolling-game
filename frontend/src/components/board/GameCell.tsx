import React from 'react';
import {IGameCell} from "../../models/game/IGameCell";

interface GameCellProps {
    cell: IGameCell
}

function GameCell(props: GameCellProps) {
    const gapStyle = {
        backgroundColor: props.cell.isGray ? 'gray' : ''
    }

    const cellStyle = {
        backgroundColor: props.cell.isShared ? '#e5c900' : props.cell.color ? props.cell.color : '#FFFFFF'
    }

    return (
        <div className={"game-cell-div"}>
            <div style={gapStyle} className={"cell-gap"}></div>
            <div style={cellStyle} className={"game-cell"}>
                <p className={"cell-position"}>{props.cell.position}</p>
            </div>
        </div>
    )
}

export default GameCell;
