import React from 'react';
import {IGameCell} from "../../models/game/IGameCell";
import {useDrop} from "react-dnd";
import {IPlayer} from "../../models/game/IPlayer";
import {IGame} from "../../models/game/IGame";

interface GameCellProps {
    game: IGame,
    cell: IGameCell,
    players: IPlayer[],
    children?: React.ReactNode,
    canMove: (position: number) => boolean,
    moveIcon: (position: number) => void
}

function GameCell(props: GameCellProps) {
    const gapStyle = {
        backgroundColor: props.cell.isGray ? 'gray' : ''
    }

    const cellStyle = {
        backgroundColor: props.cell.isShared ? '#e5c900' : props.cell.color ? props.cell.color : '#FFFFFF'
    }

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'PlayerIcon',
        drop: () => props.moveIcon(props.cell.position),
        canDrop: () => props.canMove(props.cell.position),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
    }), [props.game, props.cell, props.players])

    return (
        <div ref={drop} className={"game-cell-div"}>
            <div style={gapStyle} className={"cell-gap"}></div>
            <div style={cellStyle} className={"game-cell"}>
                <p className={"cell-position"}>{props.cell.position}</p>
                {!isOver && canDrop && <p style={{color: "black"}}>Available</p>}
                {isOver && !canDrop && <p style={{color: "black"}}>No</p>}
                {props.children}
            </div>
        </div>
    )
}

export default GameCell;
