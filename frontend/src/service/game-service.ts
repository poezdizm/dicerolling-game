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

const GameService = {
    getGame,
    deleteGame
};

export default GameService;