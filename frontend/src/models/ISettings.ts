import {IUser} from "./IUser";
import {ITypeValue} from "./ITypeValue";

export interface ISettings {
    title: string,
    maxCellNumber: number,
    isShared: boolean,
    grayZoneNumber: number,
    hasSharedCell: boolean,
    playersNumber: number
    owner: IUser,
    typeValues: ITypeValue[]
}