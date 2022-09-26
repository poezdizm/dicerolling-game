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

const getTypesCount = () => {
    return http.get('/cells/types/count', {headers: authHeader()})
        .then(response => {return response.data})
}

const CellService = {
    getCells,
    saveCell,
    deleteCell,
    getTypesCount
};

export default CellService;