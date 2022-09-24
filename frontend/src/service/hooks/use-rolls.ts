import React, {useEffect, useState} from "react";
import {IRollHistory} from "../../models/IRollHistory";
import http from "../../http-common";
import {authHeader} from "./auth-header";

export function useRolls() {
    const [rolls, setRolls] = useState<IRollHistory[]>([])

    async function fetchRolls() {
        await http.get('/rolls', {headers: authHeader()})
            .then(response => setRolls(response.data))
    }

    useEffect(() => {
        fetchRolls()
    }, [])

    return {rolls}
}