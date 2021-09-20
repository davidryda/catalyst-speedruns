import React, {useContext} from "../../../web_modules/react.js";
import levels from "../../assets/Levels.js";
import ScoreFormatter2 from "../../helpers/ScoreFormatter.js";
import GetLevelName2 from "../../helpers/GetLevelName.js";
import {useState, useEffect} from "../../../web_modules/react.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
import styles from "./Persona.module.css.proxy.js";
import {useParams, Link} from "../../../web_modules/react-router-dom.js";
import * as Api from "../../helpers/Api.js";
import MirrorsEdgeApiHistoryContext2 from "../../contexts/MirrorsEdgeApiHistoryContext.js";
const Persona = () => {
  const [resultItems, SetResultItems] = useState(null);
  const [currentSortOrder, SetCurrentSortOrder] = useState();
  const navbarTitleContext = useContext(NavbarTitleContext2);
  const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext2);
  let params = useParams();
  const runnerName = params?.runnerName;
  const platform = params?.platform;
  const personaId = params?.id;
  useEffect(() => {
    const key = platform + personaId;
    const stateData = mirrorsEdgeApiHistory.FetchHistory.get(key);
    if (stateData === void 0 || new Date().getTime() - stateData?.FetchTime > 300 * 1e3) {
      Api.GetRunnersRouteData(personaId, platform).then((r) => {
        SetResultItems(r);
        mirrorsEdgeApiHistory.SetApiHistory(mirrorsEdgeApiHistory.FetchHistory.set(key, {FetchTime: new Date().getTime(), StateData: JSON.stringify(r)}));
      });
    } else
      SetResultItems(JSON.parse(stateData.StateData));
    navbarTitleContext.SetNavbarTitle(runnerName);
    return () => {
      navbarTitleContext.SetNavbarTitle("");
    };
  }, []);
  let totalTime = ScoreFormatter2(resultItems?.map((x) => x.userRank?.score ?? "0").reduce((a, b) => +a + +b, 0).toString());
  const SortResultItems = (sortOrder) => {
    SetCurrentSortOrder(sortOrder);
    switch (sortOrder) {
      case "score_asc":
        SetResultItems([...resultItems || []].sort((a, b) => +a.userRank?.score - +b.userRank?.score));
        break;
      case "score_desc":
        SetResultItems([...resultItems || []].sort((a, b) => +b.userRank?.score - +a.userRank?.score));
        break;
      case "level_asc":
        SetResultItems([...resultItems || []].sort((a, b) => GetLevelName2(a.id) > GetLevelName2(b.id) ? 1 : -1));
        break;
      case "level_desc":
        SetResultItems([...resultItems || []].sort((a, b) => GetLevelName2(a.id) < GetLevelName2(b.id) ? 1 : -1));
        break;
      case "date_asc":
        SetResultItems([...resultItems || []].sort((a, b) => +a.userStats?.finishedAt - +b.userStats?.finishedAt));
        break;
      case "date_desc":
        SetResultItems([...resultItems || []].sort((a, b) => +b.userStats?.finishedAt - +a.userStats?.finishedAt));
        break;
    }
  };
  let sortOrderIcon;
  switch (currentSortOrder) {
    case "score_asc":
    case "level_asc":
    case "date_asc":
      sortOrderIcon = /* @__PURE__ */ React.createElement("span", null, "\u25B2");
      break;
    case "score_desc":
    case "level_desc":
    case "date_desc":
      sortOrderIcon = /* @__PURE__ */ React.createElement("span", null, "\u25BC");
      break;
    default:
      "";
      break;
  }
  const levelSortFunc = currentSortOrder === "level_asc" ? "level_desc" : "level_asc";
  const scoreSortFunc = currentSortOrder === "score_asc" ? "score_desc" : "score_asc";
  const dateSortFunc = currentSortOrder === "date_asc" ? "date_desc" : "date_asc";
  const levelSortIcon = currentSortOrder === "level_asc" || currentSortOrder === "level_desc" ? sortOrderIcon : null;
  const scoreSortIcon = currentSortOrder === "score_asc" || currentSortOrder === "score_desc" ? sortOrderIcon : null;
  const dateSortIcon = currentSortOrder === "date_asc" || currentSortOrder === "date_desc" ? sortOrderIcon : null;
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("table", {
    className: styles.table
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
    onClick: () => SortResultItems(levelSortFunc)
  }, "Level ", levelSortIcon), /* @__PURE__ */ React.createElement("th", {
    onClick: () => SortResultItems(scoreSortFunc)
  }, "Score ", scoreSortIcon), /* @__PURE__ */ React.createElement("th", {
    onClick: () => SortResultItems(dateSortFunc)
  }, "Date ", dateSortIcon))), /* @__PURE__ */ React.createElement("tbody", null, resultItems?.map((r, i) => {
    const date = new Date(+r.userStats?.finishedAt);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const href = `/leaderboard/${r.id}`;
    const levelName = levels.find((x) => x.Id === r.id)?.Name;
    const score = ScoreFormatter2(r.userRank?.score);
    const dateObtained = r.userStats?.finishedAt === null || r.userStats?.finishedAt === "0" ? null : `${month}/${day}/${year}`;
    return /* @__PURE__ */ React.createElement("tr", {
      key: i
    }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Link, {
      to: href
    }, levelName)), /* @__PURE__ */ React.createElement("td", null, score), /* @__PURE__ */ React.createElement("td", null, dateObtained));
  }), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, totalTime), /* @__PURE__ */ React.createElement("td", null)))));
};
export default Persona;
