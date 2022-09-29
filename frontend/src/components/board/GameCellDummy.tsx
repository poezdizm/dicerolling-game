import React from 'react';
import {useDrop} from "react-dnd";
import {IPlayer} from "../../models/game/IPlayer";
import {IGame} from "../../models/game/IGame";

interface GameCellProps {
    className?: string,
    position: number,
    game: IGame,
    players: IPlayer[],
    children?: React.ReactNode,
    canMove: (position: number) => boolean,
    moveIcon: (position: number) => void
}

function GameCellDummy(props: GameCellProps) {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'PlayerIcon',
        drop: () => props.moveIcon(props.position),
        canDrop: () => props.canMove(props.position),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [props.game, props.position, props.players])

    return (
        <div ref={drop} className={"game-cell-div"}>
            <div className={"cell-gap"}></div>
            <div className={"game-cell " + props.className}>
                {props.children}
            </div>
        </div>
    )
}

export default GameCellDummy;
