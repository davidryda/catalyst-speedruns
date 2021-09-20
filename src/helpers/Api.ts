import type ILeaderboardStateEntities from "../models/LeaderboardStateEntities";
import platforms from "../assets/Platforms";
import type ILeaderboardResponse from "../models/LeaderboardResponse";
import type ILeaderboardResponseEntity from "../models/LeaderboardResponseEntity";
import type IPlatformRunCount from "../models/PlatformRunCount";
import banList from "../assets/BanList";
import levels from "../assets/Levels";
import type IResultItem from "../models/ResultItem";
import type IPersonaStats from "../models/PersonaStats";
import type IPlayerInfoResponse from "../models/PlayerInfoResponse";
import type IPvpInfo from "../models/PvpInfo";
import type ILevelResponse from "../models/Speedrun/LevelResponse";
import correctedScores from "../assets/CorrectedScores";
import CorrectLeaderboardScores from "./CorrectLeaderboardScores";
import CorrectRunnerScores from "./CorrectRunnerScores";
import type ILevel from "../models/mirrorsedgecatalystapi/Level";
import { MEC_API } from "../GlobalVariables";

export async function GetRunnersRouteLeaderboards(levelId: string): Promise<ILeaderboardStateEntities> {
    const requestParameters = {
        "jsonrpc": "2.0",
        "method": "Pamplona.getRunnersRouteLeaderboard",
        "params": { "challengeId": levelId, "offset": null, "count": null },
        "id": "8007ace1-5936-4b1f-89c0-f51c07729325"
    }
    let leaderboardResponses: ILeaderboardResponseEntity[] = [];
    for (let i = 0; i < platforms.length; i++) {
        await fetch(`https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/${platforms[i]}/api`, {
            method: "POST",
            body: JSON.stringify(requestParameters)
        }).then(data => data.json())
            .then((res: ILeaderboardResponse) => {
                leaderboardResponses.push({ platform: platforms[i], leaderboardResponse: res });
            });
    }
    leaderboardResponses.forEach(r => r.leaderboardResponse.result.leaderboard.users.forEach(user => user.platform = r.platform));
    let allRunners = leaderboardResponses.flatMap(r => r.leaderboardResponse.result.leaderboard.users);
    let filteredRunners = allRunners.filter(user => banList.indexOf(+user.personaId) < 0);
    let prcs: IPlatformRunCount[] = leaderboardResponses.map(x => ({ Platform: x.platform, RunCount: x.leaderboardResponse.result.leaderboard.totalCount }));
    prcs.push({ Platform: "total", RunCount: prcs.map(x => x.RunCount).reduce((a, b) => a + b) });

    filteredRunners = CorrectLeaderboardScores(levelId, filteredRunners).sort((a, b) => +a.score - +b.score);

    const leaderboardStateEntities: ILeaderboardStateEntities = {
        Leaderboard: filteredRunners,
        PlatformRunCounts: prcs
    };

    return leaderboardStateEntities
};

export async function GetRunnersRouteData(personaId: string, platform: string): Promise<IResultItem[]> {
    let resultItemArr: IResultItem[] = [];
    const requestContent = {
        "jsonrpc": "2.0",
        "method": "Pamplona.getRunnersRouteData",
        "params": { "challengeIds": levels.map(x => x.Id), "dataTypes": ["USER_STATS"], "personaId": personaId },
        "id": "d57601c0-4891-4933-b92c-b6f7945c9ff1"
    };
    await fetch(`https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/${platform}/api`, {
        method: "POST",
        body: JSON.stringify(requestContent)
    }).then(r => r.json())
        .then((data: IPersonaStats) => {
            resultItemArr = CorrectRunnerScores(personaId, data.result);
            resultItemArr = resultItemArr.map(x => {
                if (!x.userRank) x.userRank = { rank: 0, score: "0", total: 0 };
                if (!x.userStats) x.userStats = { finishedAt: "0", finishTime: "0", extraStats: null, runId: x.id };
                return x;
            });
        })
    //.catch((e: Response) => alert(e.status));
    return resultItemArr;
}

export async function GetPlayerInfo(personaId: string, platform: string): Promise<string> {
    let name = "";
    const requestContent2 = { "jsonrpc": "2.0", "method": "Pamplona.getPlayerInfo", "params": { "personaId": personaId }, "id": "32cdae53-dbc2-49a5-b575-d7eaa3fb5a42" }
    await fetch(`https://mec-gw.ops.dice.se/jsonrpc/prod_default/prod_default/${platform}/api`, { method: "POST", body: JSON.stringify(requestContent2) })
        .then(r => r.json())
        .then((data: IPlayerInfoResponse) => {
            name = data.result?.name;
            if (!name) alert("Could not find runner name");
        });
        //.catch((e: Response) => alert(e.status));
    return name;
}

export async function GetPlayersPvpRouteData(personaId1: string, platform1: string, personaId2: string, platform2: string): Promise<IPvpInfo[]> {
    const p1 = await GetRunnersRouteData(personaId1, platform1);
    const p2 = await GetRunnersRouteData(personaId2, platform2);

    let pvpInfoArr: IPvpInfo[] = [];
    for (let i = 0; i < levels.length; i++) {
        const p1Time = p1.find(x => x.id === levels[i].Id)?.userRank?.score ?? "0";
        const p2Time = p2.find(x => x.id === levels[i].Id)?.userRank?.score ?? "0";

        pvpInfoArr.push({ LevelId: levels[i].Id, LevelName: levels[i].Name, Player1Time: +p1Time, Player2Time: +p2Time });
    }

    return pvpInfoArr;
}

export async function GetFastestAvailableRunVideoLink(levelId: string): Promise<string | undefined> {
    const speedrunId = levels.find(x => x.Id === levelId)?.SpeedrunId;
    let link = undefined;
    await fetch(`https://www.speedrun.com/api/v1/leaderboards/m1mgl312/level/${speedrunId}/xk9lnj6k`)
        .then(r => r.json())
        .then((data: ILevelResponse) => {
            link = data.data.runs[0].run.videos.links[0].uri;
            if (!link) alert("Could not find fastest run video link!");
        });
    return link;
}

export async function FetchLevels(): Promise<ILevel[]> {
    let levels: ILevel[] = [];
    await fetch(`${MEC_API}mec/levels`)
        .then(r => {
            if (r.status != 200) {
                alert(`Failed to fetch level types. Status Code: ${r.status}`);
                return levels;
            } 
            return r.json();
        })
        .then((data: ILevel[]) => {
            levels = data;
        });
    return levels;
}