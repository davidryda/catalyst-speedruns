import type IResultItem from "../models/ResultItem";
import correctedScores from "../assets/CorrectedScores";

const CorrectRunnerScores = (personaId: string, resultItems: IResultItem[]): IResultItem[] => {
    return resultItems.map(x => {
        const matchedLevelCorrections = correctedScores.find(z => z.Id === x.id)?.Corrections;
        const correctedScore = matchedLevelCorrections?.find(z => z.PersonaId === personaId)?.Score;
        if (correctedScore && +x.userStats.finishedAt > +correctedScore) x.userRank.score = correctedScore;
        return x;
    });
}

export default CorrectRunnerScores;