import type IExtraStats from "./ExtraStats";

export default interface IUserStats {
    finishedAt: string;
    finishTime: string;
    extraStats: IExtraStats;
    runId: string;
}