import type IStateData from "./StateData";

export default interface IApiHistoryContext {
    FetchHistory: Map<string, IStateData>;
    SetApiHistory: (history: Map<string, IStateData>) => void;
}