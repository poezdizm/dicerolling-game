import http from "../http-common";
import {ICell} from "../models/ICell";
import {authHeader} from "./hooks/auth-header";

const saveCell = (cell: ICell) => {
    return http.post("/cells", cell, {headers: authHeader()})
        .then(response => {
            return "";
        })
        .catch(function (error) {
            return error.response.data.message
        });
}

const getCells = () => {
    return http.get('/cells', {headers: authHeader()})
        .then(response => {return response.data})
}

const CellService = {
    getCells,
    saveCell
};

export default CellService;