import levels from "../assets/Levels.js";
const GetLevelName = (id) => {
  const levelName = levels.find((x) => x.Id === id)?.Name;
  if (levelName === void 0)
    throw new Error("Could not find level name");
  return levelName;
};
export default GetLevelName;
