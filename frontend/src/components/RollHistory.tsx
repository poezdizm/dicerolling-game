import React from 'react';
import {IRollHistory} from "../models/IRollHistory";

interface RollProps {
    roll: IRollHistory
}

function RollHistory(props: RollProps) {
    return (
        <>
            <p>{props.roll.username} ({props.roll.rollValue})</p>
        </>
    )
}

export default RollHistory;
