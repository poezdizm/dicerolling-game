import React, {useEffect, useState} from "react";
import http from "../../http-common";
import {authHeader} from "./auth-header";
import {IGameSimplified} from "../../models/IGameSimplified";

export function useGames() {
    const [games, setGames] = useState<IGameSimplified[]>([])

    async function fetchGames() {
        await http.get('/game/all', {headers: authHeader()})
            .then(response => setGames(response.data))
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return {games}
}