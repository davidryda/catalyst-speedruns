const ScoreFormatter = (score?: string): string => {
    if (score == null) return "";
    const seconds = +score / 100;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    const remainingSecondsFormatted = remainingSeconds < 10 ? "0" + remainingSeconds.toFixed(2) : remainingSeconds.toFixed(2);
    const formattedScore = seconds < 60 ? seconds.toFixed(2) : `${minutes}:${remainingSecondsFormatted}`
    return formattedScore;
}

export default ScoreFormatter;