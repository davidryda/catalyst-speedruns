import type IUsersEntity from "./UserEntity";
import type IPlatformRunCount from "./PlatformRunCount";

export default interface ILeaderboardStateEntities {
    Leaderboard: IUsersEntity[];
    PlatformRunCounts: IPlatformRunCount[];
}