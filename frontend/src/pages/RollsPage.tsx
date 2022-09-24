import React from "react";
import {useRolls} from "../service/hooks/use-rolls";
import RollHistory from "../components/RollHistory";
import logo from "../logo.svg";

export function RollsPage() {

    const {rolls} = useRolls()

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="container mx-auto max-w-2xl pt-5">
                        {rolls.map(roll => <RollHistory roll={roll} key={roll.id}/>)}
                    </div>
                </header>
            </div>
        </>
    )
}