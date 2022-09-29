import React from 'react'
import {DragPreviewImage, useDrag} from "react-dnd";
import {IPlayer} from "../../models/game/IPlayer";

interface PlayerIconProps {
    player: IPlayer,
    currentPlayer: IPlayer
}

function PlayerIcon(props: PlayerIconProps) {
    const [{isDragging, canDrag}, drag, preview] = useDrag(() => ({
        type: 'PlayerIcon',
        canDrag: props.player.username === props.currentPlayer.username,
        collect: monitor => ({
            canDrag: !!monitor.canDrag(),
            isDragging: !!monitor.isDragging()
        }),
    }))

    const iconImage = props.currentPlayer.username == props.player.username ? '/current-player-icon.png' : '/player-icon.png'

    return (
        <>
            <DragPreviewImage connect={preview} src={iconImage} />
            <div ref={drag}
                 className={"player-icon"}
                 style={{
                     opacity: isDragging ? 0.5 : 1,
                     cursor: canDrag ? (props.player.username === props.currentPlayer.username ? "move" : "default") : "not-allowed"
                 }}>
                <img src={iconImage} />
                {props.player.id && <p>{props.player.username.at(0)}</p>}
            </div>
        </>
    )
}

export default PlayerIcon;