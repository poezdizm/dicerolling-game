import http from "../http-common";
import {authHeader} from "./hooks/auth-header";

const deleteGame = (gameId: number) => {
    return http.delete('/game?id='+gameId, {headers: authHeader()})
        .then(response => {return response.data})
}

const GameService = {
    deleteGame
};

export default GameService;