import http from "../http-common";
import {ICell} from "../models/ICell";
import {authHeader} from "./hooks/auth-header";

const saveCell = (cell: ICell) => {
    return http.post("/cells", cell, {headers: authHeader()})
        .then(response => {
            return response;
        })
        .catch(function (error) {
            return error.response.data.message
        });
}

const getCells = () => {
    return http.get('/cells', {headers: authHeader()})
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

const getCellCount = () => {
    return http.get('/cells/count', {headers: authHeader()})
        .then(response => {return response.data})
}

const CellService = {
    getCells,
    saveCell,
    deleteCell,
    getCellTypes,
    getCellCount
};

export default CellService;