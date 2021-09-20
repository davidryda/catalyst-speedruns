import correctedScores from "../assets/CorrectedScores.js";
const CorrectLeaderboardScores = (levelId, runners) => {
  const corrections = correctedScores.find((x) => x.Id === levelId)?.Corrections;
  return runners.map((x) => {
    const matchedCorrection = corrections?.find((z) => z.PersonaId === x.personaId);
    if (matchedCorrection && +x.score > +matchedCorrection.Score)
      x.score = matchedCorrection.Score;
    return x;
  });
};
export default CorrectLeaderboardScores;
