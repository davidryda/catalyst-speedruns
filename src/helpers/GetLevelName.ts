import levels from "../assets/Levels";

const GetLevelName = (id: string): string => {
    const levelName = levels.find(x => x.Id === id)?.Name
    if (levelName === undefined) throw new Error("Could not find level name");
    return levelName;
}

export default GetLevelName;