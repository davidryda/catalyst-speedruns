import type ILeaderboard from "./Leaderboard";

export default interface IResult {
    leaderboard: ILeaderboard;
    user?: null;
}