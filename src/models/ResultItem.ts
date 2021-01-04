import type IUserStats from "./UserStats";
import type IUserRank from "./UserRank";

export default interface IResultItem {
    id: string;
    stats: null;
    userStats: IUserStats;
    userRank: IUserRank;
}