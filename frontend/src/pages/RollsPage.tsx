import React, {useEffect, useState} from "react";
import {useRolls} from "../hooks/use-rolls";
import RollHistory from "../components/RollHistory";
import logo from "../logo.svg";
import {IUser} from "../models/IUser";
import axios from "axios";

export function RollsPage() {

    const [user, setUser] = useState<IUser>()
    const {rolls} = useRolls()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="container mx-auto max-w-2xl pt-5">
                    {rolls.map(roll => <RollHistory roll={roll} key={roll.id}/>)}
                </div>
            </header>
        </div>
    )
}