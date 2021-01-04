import type IPlayerInfoResult from "./PlayerInfoResult";

export default interface IPlayerInfoResponse {
    jsonrpc: string;
    id: string;
    result: IPlayerInfoResult;
}