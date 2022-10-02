import React from 'react';
import {useDrop} from "react-dnd";
import {IPlayer} from "../../models/game/IPlayer";
import {IGame} from "../../models/game/IGame";

interface GameCellProps {
    className?: string,
    position: number,
    game: IGame,
    currentPlayer: IPlayer,
    players: IPlayer[],
    children?: React.ReactNode,
    canMove: (position: number) => boolean,
    moveIcon: (position: number) => void
}

function GameCellDummy(props: GameCellProps) {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'PlayerIcon',
        drop: () => props.moveIcon(props.position),
        canDrop: () => props.canMove(props.position),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
    }), [props.game, props.position, props.players, props.currentPlayer])

    return (
        <div ref={drop} className={"game-cell-div"}>
            <div className={"cell-gap"}></div>
            <div className={"game-cell " + props.className}>
                {isOver && canDrop && <div className={"cell-available"}></div>}
                {!isOver && canDrop && <div className={"cell-available-on"}></div>}
                {isOver && !canDrop && <div className={"cell-unavailable"}></div>}
                {props.children}
            </div>
        </div>
    )
}

export default GameCellDummy;
