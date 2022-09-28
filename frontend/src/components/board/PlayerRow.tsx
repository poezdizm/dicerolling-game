import React from 'react';
import {ProgressBar, Row} from "react-bootstrap";
import {IPlayer} from "../../models/game/IPlayer";

interface PlayerRowProps {
    player: IPlayer,
    max: number
}

function PlayerRow(props: PlayerRowProps) {

    return (
        <Row>
            <div>
                {props.player.id ?
                    <div className={"players-row players-info"}>
                        <div className={"player-username"}>{props.player.username}</div>
                        <div className={"player-position"}>
                            <p className={"player-progress-label"}>{props.player.position}/{props.max}</p>
                            <ProgressBar variant="success" now={((props.player.position)/props.max) * 100} />
                        </div>
                        <div className={"player-roll"}>1</div>
                    </div>
                    :
                    <div className={"players-row players-placeholder"}>
                        <p>Waiting for player...</p>
                    </div>
                }
            </div>
        </Row>
    )
}

export default PlayerRow;
