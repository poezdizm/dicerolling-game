import {ICellType} from "./ICellType";

export interface ICell {
    id: number,
    content?: string,
    type?: ICellType,
    packId?: number
}