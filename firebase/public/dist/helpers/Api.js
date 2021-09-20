import platforms from "../assets/Platforms.js";
import banList from "../assets/BanList.js";
import levels from "../assets/Levels.js";
import CorrectLeaderboardScores2 from "./CorrectLeaderboardScores.js";
import CorrectRunnerScores2 from "./CorrectRunnerScores.js";
export async function GetRunnersRouteLeaderboards(levelId) {
  const requestParameters = {
    jsonrpc: "2.0",
    method: "Pamplona.getRunnersRouteLeaderboard",
    params: {challengeId: levelId, offset: null, count: null},
    id: "8007ace1-5936-4b1f-89c0-f51c07729325"
  };
  let leaderboardResponses = [];
  for (let i = 0; i < platforms.length; i++) {
    await fetch(`https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/${platforms[i]}/api`, {
      method: "POST",
      body: JSON.stringify(requestParameters)
    }).then((data) => data.json()).then((res) => {
      leaderboardResponses.push({platform: platforms[i], leaderboardResponse: res});
    });
  }
  leaderboardResponses.forEach((r) => r.leaderboardResponse.result.leaderboard.users.forEach((user) => user.platform = r.platform));
  let allRunners = leaderboardResponses.flatMap((r) => r.leaderboardResponse.result.leaderboard.users);
  let filteredRunners = allRunners.filter((user) => banList.indexOf(+user.personaId) < 0);
  let prcs = leaderboardResponses.map((x) => ({Platform: x.platform, RunCount: x.leaderboardResponse.result.leaderboard.totalCount}));
  prcs.push({Platform: "total", RunCount: prcs.map((x) => x.RunCount).reduce((a, b) => a + b)});
  filteredRunners = CorrectLeaderboardScores2(levelId, filteredRunners).sort((a, b) => +a.score - +b.score);
  const leaderboardStateEntities = {
    Leaderboard: filteredRunners,
    PlatformRunCounts: prcs
  };
  return leaderboardStateEntities;
}
;
export async function GetRunnersRouteData(personaId, platform) {
  let resultItemArr = [];
  const requestContent = {
    jsonrpc: "2.0",
    method: "Pamplona.getRunnersRouteData",
    params: {challengeIds: levels.map((x) => x.Id), dataTypes: ["USER_STATS"], personaId},
    id: "d57601c0-4891-4933-b92c-b6f7945c9ff1"
  };
  await fetch(`https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/${platform}/api`, {
    method: "POST",
    body: JSON.stringify(requestContent)
  }).then((r) => r.json()).then((data) => {
    resultItemArr = CorrectRunnerScores2(personaId, data.result);
    resultItemArr = resultItemArr.map((x) => {
      if (!x.userRank)
        x.userRank = {rank: 0, score: "0", total: 0};
      if (!x.userStats)
        x.userStats = {finishedAt: "0", finishTime: "0", extraStats: null, runId: x.id};
      return x;
    });
  });
  return resultItemArr;
}
export async function GetPlayerInfo(personaId, platform) {
  let name = "";
  const requestContent2 = {jsonrpc: "2.0", method: "Pamplona.getPlayerInfo", params: {personaId}, id: "32cdae53-dbc2-49a5-b575-d7eaa3fb5a42"};
  await fetch(`https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/${platform}/api`, {method: "POST", body: JSON.stringify(requestContent2)}).then((r) => r.json()).then((data) => {
    name = data.result?.name;
    if (!name)
      alert("Could not find runner name");
  });
  return name;
}
export async function GetPlayersPvpRouteData(personaId1, platform1, personaId2, platform2) {
  const p1 = await GetRunnersRouteData(personaId1, platform1);
  const p2 = await GetRunnersRouteData(personaId2, platform2);
  let pvpInfoArr = [];
  for (let i = 0; i < levels.length; i++) {
    const p1Time = p1.find((x) => x.id === levels[i].Id)?.userRank?.score ?? "0";
    const p2Time = p2.find((x) => x.id === levels[i].Id)?.userRank?.score ?? "0";
    pvpInfoArr.push({LevelId: levels[i].Id, LevelName: levels[i].Name, Player1Time: +p1Time, Player2Time: +p2Time});
  }
  return pvpInfoArr;
}
export async function GetFastestAvailableRunVideoLink(levelId) {
  const speedrunId = levels.find((x) => x.Id === levelId)?.SpeedrunId;
  let link = void 0;
  await fetch(`https://www.speedrun.com/api/v1/leaderboards/m1mgl312/level/${speedrunId}/xk9lnj6k`).then((r) => r.json()).then((data) => {
    link = data.data.runs[0].run.videos.links[0].uri;
    if (!link)
      alert("Could not find fastest run video link!");
  });
  return link;
}
export async function FetchLevels() {
  let levels2 = [];
  await fetch("https://mirrorsedgecatalyst.herokuapp.com/mec/levels").then((r) => {
    if (r.status != 200) {
      alert(`Failed to fetch level types. Status Code: ${r.status}`);
      return levels2;
    }
    return r.json();
  }).then((data) => {
    levels2 = data;
  });
  return levels2;
}
