import type IUsersEntity from "../models/UserEntity";
import correctedScores from "../assets/CorrectedScores";

const CorrectLeaderboardScores = (levelId: string, runners: IUsersEntity[]): IUsersEntity[] => {
    const corrections = correctedScores.find(x => x.Id === levelId)?.Corrections;
    return runners.map(x => {
        const matchedCorrection = corrections?.find(z => z.PersonaId === x.personaId);
        if (matchedCorrection && +x.score > +matchedCorrection.Score) x.score = matchedCorrection.Score;
        return x;
    });
}

export default CorrectLeaderboardScores;