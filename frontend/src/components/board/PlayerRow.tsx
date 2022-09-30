import React from 'react';
import {ProgressBar, Row} from "react-bootstrap";
import {IPlayer} from "../../models/game/IPlayer";
import {Dice1, Dice2, Dice3, Dice4, Dice5, Dice6} from "react-bootstrap-icons";

interface PlayerRowProps {
    player: IPlayer,
    max: number
}

function PlayerRow(props: PlayerRowProps) {

    function renderDiceIcon(roll: number | undefined) {
        switch (roll) {
            case 1:
                return <Dice1 />;
            case 2:
                return <Dice2 />;
            case 3:
                return <Dice3 />;
            case 4:
                return <Dice4 />;
            case 5:
                return <Dice5 />;
            case 6:
                return <Dice6 />;
            default:
                return null;
        }
    }

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
                        <div className={"player-roll"}>
                            {renderDiceIcon(props.player.lastRollValue)}
                        </div>
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
