import type ILeaderboardResponse from "./LeaderboardResponse";

export default interface ILeaderboardResponseEntity {
    platform: string;
    leaderboardResponse: ILeaderboardResponse;
}