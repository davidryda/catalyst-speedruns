import type IResult from "./Result";

export default interface ILeaderboardResponse {
    jsonrpc: string;
    id: string;
    result: IResult;
}