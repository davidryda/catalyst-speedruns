import type IDivision from "./Division";

export default interface IUsersEntity {
    position: number;
    globalRank: number;
    score: string;
    percentile: number;
    personaId: string;
    name: string;
    division: IDivision;
    platform: string;
}