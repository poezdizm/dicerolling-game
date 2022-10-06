import http from "../http-common";
import {ICell} from "../models/ICell";
import {authHeader} from "./hooks/auth-header";
import {ICellPack} from "../models/ICellPack";

const saveCell = (cell: ICell) => {
    return http.post("/cells", cell, {headers: authHeader()})
        .then(response => {
            return response
        })
        .catch(function (error) {
            return error.response.data.message
        })
}

const getCells = (packId: number) => {
    return http.get('/cells?pack=' + packId, {headers: authHeader()})
        .then(response => {return response.data})
}

const deleteCell = (cellId: number) => {
    return http.delete('/cells/'+cellId, {headers: authHeader()})
        .then(response => {return response.data})
}

const getCellTypes = () => {
    return http.get('/cells/types', {headers: authHeader()})
        .then(response => {return response.data})
}

const getCellCount = (pack: number) => {
    return http.get('/cells/count?pack='+pack, {headers: authHeader()})
        .then(response => {return response.data})
}

const getCellPacks = () => {
    return http.get('/cells/packs', {headers: authHeader()})
        .then(response => {return response.data})
}

const savePack = (pack: ICellPack) => {
    return http.post('/cells/packs', pack, {headers: authHeader()})
        .then(response => {
            return response
        })
        .catch(function (error) {
            return error.response.data.message
        })
}

const CellService = {
    getCells,
    saveCell,
    deleteCell,
    getCellTypes,
    getCellCount,
    getCellPacks,
    savePack
};

export default CellService;