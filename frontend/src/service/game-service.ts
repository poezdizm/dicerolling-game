import http from "../http-common";
import {authHeader} from "./hooks/auth-header";

const getGame = (gameId: number) => {
    return http.get('/game?id='+gameId, {headers: authHeader()})
        .then(response => {return response.data})
}

const deleteGame = (gameId: number) => {
    return http.delete('/game?id='+gameId, {headers: authHeader()})
        .then(response => {return response.data})
}

const sendRoll = (gameId: number, value: number) => {
    return http.post("/game/roll", {"gameId": gameId, "value": value}, {headers: authHeader()})
        .then(response => {return response.data})
}

const GameService = {
    getGame,
    deleteGame,
    sendRoll
};

export default GameService;