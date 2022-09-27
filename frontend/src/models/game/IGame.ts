import {IGameCell} from "./IGameCell";
import {IPlayer} from "./IPlayer";

export interface IGame {
    id: number,
    title: string,
    cells: IGameCell[],
    players: IPlayer[],
    isStarted: boolean,
    playersMax: number
}