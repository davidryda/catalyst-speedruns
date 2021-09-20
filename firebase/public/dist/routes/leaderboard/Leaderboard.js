import React, {Fragment, useContext, useState, useEffect} from "../../../web_modules/react.js";
import levels from "../../assets/Levels.js";
import ScoreFormatter2 from "../../helpers/ScoreFormatter.js";
import GetLevelName2 from "../../helpers/GetLevelName.js";
import styles from "./Leaderboard.module.css.proxy.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
import xbox2 from "../../../icons/xbox.svg.proxy.js";
import playstation from "../../../icons/playstation_white.svg.proxy.js";
import pc from "../../../icons/origin.svg.proxy.js";
import globe2 from "../../../icons/globe.svg.proxy.js";
import {useLocation, useHistory, useParams, Link} from "../../../web_modules/react-router-dom.js";
import MirrorsEdgeApiHistoryContext2 from "../../contexts/MirrorsEdgeApiHistoryContext.js";
import * as Api from "../../helpers/Api.js";
import SpeedrunApiHistoryContext2 from "../../contexts/SpeedrunApiHistoryContext.js";
import EllipsisLoader2 from "../../components/loaders/EllipsisLoader.js";
import SettingsContext2 from "../../contexts/SettingsContext.js";
import Themes from "../../assets/design/themes.js";
const Leaderboard = () => {
  const [state, SetState] = useState(null);
  const [fastestAvailableRunLink, SetFastestAvailableRunLink] = useState();
  const settingsContext = useContext(SettingsContext2);
  const navbarTitleContext = useContext(NavbarTitleContext2);
  const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext2);
  const speedrunApiHistory = useContext(SpeedrunApiHistoryContext2);
  let params = useParams();
  let location = useLocation();
  let history = useHistory();
  if (params == null)
    history.replace("/");
  if (levels.map((x) => x.Id).indexOf(params.id) < 0)
    history.replace("/");
  useEffect(() => {
    const mirrorsEdgeStateData = mirrorsEdgeApiHistory.FetchHistory.get(location.pathname);
    if (mirrorsEdgeStateData === void 0 || new Date().getTime() - mirrorsEdgeStateData?.FetchTime > 300 * 1e3) {
      Api.GetRunnersRouteLeaderboards(params.id).then((r) => {
        SetState(r);
        mirrorsEdgeApiHistory.SetApiHistory(mirrorsEdgeApiHistory.FetchHistory.set(location.pathname, {FetchTime: new Date().getTime(), StateData: JSON.stringify(r)}));
      });
    } else
      SetState(JSON.parse(mirrorsEdgeStateData.StateData));
    const speedrunStateData = speedrunApiHistory.FetchHistory.get(location.pathname);
    if (speedrunStateData === void 0 || new Date().getTime() - speedrunStateData?.FetchTime > 300 * 1e3) {
      Api.GetFastestAvailableRunVideoLink(params.id).then((r) => {
        SetFastestAvailableRunLink(r);
        speedrunApiHistory.SetApiHistory(speedrunApiHistory.FetchHistory.set(location.pathname, {FetchTime: new Date().getTime(), StateData: JSON.stringify(r)}));
      });
    } else
      SetFastestAvailableRunLink(JSON.parse(speedrunStateData.StateData));
    navbarTitleContext.SetNavbarTitle(GetLevelName2(params.id));
    return () => {
      navbarTitleContext.SetNavbarTitle("");
    };
  }, []);
  const pvpOptions = [...state?.Leaderboard || []].sort((a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase())).map((x) => /* @__PURE__ */ React.createElement("option", {
    key: x.personaId,
    value: JSON.stringify({PersonaId: x.personaId, Platform: x.platform, Name: x.name})
  }, x.name));
  const player1SelectId = "player1", player2SelectId = "player2";
  const Pvp = (e) => {
    e.preventDefault();
    const a = e.currentTarget[player1SelectId];
    const b = e.currentTarget[player2SelectId];
    if (!a.value || !b.value)
      return alert(`${a.value ? "" : "Player 1 is undefined!"} ${b.value ? "" : "Player 2 is undefined!"}`.trim());
    const p1 = JSON.parse(a.value.toString());
    const p2 = JSON.parse(b.value.toString());
    history.push(`/pvp/${p1.PersonaId}/${p1.Platform}/${p1.Name}/${p2.PersonaId}/${p2.Platform}/${p2.Name}`);
  };
  const GetIcon = (platform) => {
    let icon;
    switch (platform) {
      case "pc":
        icon = pc;
        break;
      case "ps4":
        icon = playstation;
        break;
      case "xboxone":
        icon = xbox2;
        break;
      default:
        icon = globe2;
        break;
    }
    ;
    return icon;
  };
  const backgroundStyle = settingsContext.theme === Themes.Blur ? {backgroundImage: `url(/pictures/${params.id}.jpg)`} : {};
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("div", {
    style: backgroundStyle,
    className: styles.background
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.backgroundColorLayer
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.platformCountContainer
  }, state?.PlatformRunCounts?.map((x, i) => {
    return /* @__PURE__ */ React.createElement("div", {
      key: i
    }, /* @__PURE__ */ React.createElement("img", {
      src: GetIcon(x.Platform)
    }), /* @__PURE__ */ React.createElement("span", null, x.RunCount.toLocaleString()));
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.pvpContainer
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: (e) => Pvp(e)
  }, /* @__PURE__ */ React.createElement("select", {
    id: player1SelectId
  }, /* @__PURE__ */ React.createElement("option", {
    value: void 0
  }), pvpOptions), /* @__PURE__ */ React.createElement("button", {
    type: "submit"
  }, "Go!"), /* @__PURE__ */ React.createElement("select", {
    id: player2SelectId
  }, /* @__PURE__ */ React.createElement("option", {
    value: void 0
  }), pvpOptions))), /* @__PURE__ */ React.createElement("div", {
    className: styles.fastestAvailableRunContainer
  }, !fastestAvailableRunLink ? /* @__PURE__ */ React.createElement(EllipsisLoader2, null) : /* @__PURE__ */ React.createElement("a", {
    href: fastestAvailableRunLink,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "View Fastest Available Run")), /* @__PURE__ */ React.createElement("table", {
    className: styles.table
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Rank"), /* @__PURE__ */ React.createElement("th", null, "Runner"), /* @__PURE__ */ React.createElement("th", null, "Score"), /* @__PURE__ */ React.createElement("th", null, "Platform"))), /* @__PURE__ */ React.createElement("tbody", null, state?.Leaderboard?.map((x, i) => {
    return /* @__PURE__ */ React.createElement("tr", {
      key: i,
      id: x.personaId
    }, /* @__PURE__ */ React.createElement("td", null, i + 1), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Link, {
      to: `/persona/${x.platform}/${x.personaId}/${x.name ?? "[Name not found]"}`
    }, x.name ?? "[Name not found]")), /* @__PURE__ */ React.createElement("td", null, ScoreFormatter2(x.score)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("img", {
      src: GetIcon(x.platform)
    })));
  })))));
};
export default Leaderboard;
