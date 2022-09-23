import React, {useEffect, useState} from "react";
import {IRollHistory} from "../models/IRollHistory";
import axios from "axios";

export function useRolls() {
    const [rolls, setRolls] = useState<IRollHistory[]>([])

    async function fetchRolls() {
        await axios.get('http://localhost:8080/rolls')
            .then(response => setRolls(response.data))
    }

    useEffect(() => {
        fetchRolls()
    })

    return {rolls}
}