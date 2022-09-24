import React, {useEffect, useState} from "react";
import http from "../../http-common";
import {authHeader} from "./auth-header";
import {ICellType} from "../../models/ICellType";

export function useCellTypes() {
    const [cellTypes, setCellTypes] = useState<ICellType[]>([])

    async function fetchCellTypes() {
        await http.get('/cells/types', {headers: authHeader()})
            .then(response => setCellTypes(response.data))
    }

    useEffect(() => {
        fetchCellTypes()
    }, [])

    return {cellTypes}
}