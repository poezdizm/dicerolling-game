import React, {useEffect, useState} from "react";
import http from "../../http-common";
import {authHeader} from "./auth-header";
import {IStats} from "../../models/IStats";

export function useStats() {
    const [stats, setStats] = useState<IStats>({username: "", grayCells: 0, gamesWon: 0, totalRolls: 0})

    async function fetchStats() {
        await http.get('/main/stats', {headers: authHeader()})
            .then(response => setStats(response.data))
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return {stats}
}