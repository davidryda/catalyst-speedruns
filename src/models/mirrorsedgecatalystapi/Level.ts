import type ILevelType from "./LevelType";

export default interface ILevel {
    Id: number;
    Name: string;
    LevelTypeId: number;
    LevelType: ILevelType;
}