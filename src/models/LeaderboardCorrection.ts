import type IRunnerScoreCorrection from "./RunnerScoreCorrection"

export default interface ILeaderboardCorrection {
    Name: string;
    Id: string;
    Corrections: IRunnerScoreCorrection[];
}