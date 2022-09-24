import React, {useEffect, useState} from "react";
import http from "../../http-common";
import {authHeader} from "./auth-header";
import {ICell} from "../../models/ICell";

export function useCells() {
    const [cells, setCells] = useState<ICell[]>([])

    async function fetchCells() {
        await http.get('/cells', {headers: authHeader()})
            .then(response => setCells(response.data))
    }

    useEffect(() => {
        fetchCells()
    }, [])

    return {cells}
}