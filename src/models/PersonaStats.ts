import type IResultItem from "./ResultItem";

export default interface IPersonaStats {
    jsonrpc: string;
    id: string;
    result: IResultItem[];
}