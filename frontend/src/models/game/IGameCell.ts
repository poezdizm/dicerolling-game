export interface IGameCell {
    id: number,
    position: number,
    isGray: boolean,
    isShared: boolean,
    color: string,
    content?: string,
    isAvailable: boolean
}