import React, {useContext, useEffect, useState} from "../../../web_modules/react.js";
import styles from "./Pvp.module.css.proxy.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
import {useParams, useHistory, useRouteMatch, Link} from "../../../web_modules/react-router-dom.js";
import MirrorsEdgeApiHistoryContext2 from "../../contexts/MirrorsEdgeApiHistoryContext.js";
import * as Api from "../../helpers/Api.js";
import ScoreFormatter2 from "../../helpers/ScoreFormatter.js";
const Pvp = () => {
  const [pvpInfo, SetPvpInfo] = useState(null);
  const navbarTitleContext = useContext(NavbarTitleContext2);
  const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext2);
  const params = useParams();
  let match = useRouteMatch("/pvp/:persona1/:platform1/:name1/:persona2/:platform2/:name2");
  const location = useHistory();
  if (params == null)
    location.push("/");
  const {persona1, platform1, name1, persona2, platform2, name2} = params;
  useEffect(() => {
    const key = persona1 + persona2;
    const stateData = mirrorsEdgeApiHistory.FetchHistory.get(key);
    if (stateData === void 0 || new Date().getTime() - stateData?.FetchTime > 300 * 1e3) {
      Api.GetPlayersPvpRouteData(persona1, platform1, persona2, platform2).then((r) => {
        SetPvpInfo(r);
        mirrorsEdgeApiHistory.SetApiHistory(mirrorsEdgeApiHistory.FetchHistory.set(key, {FetchTime: new Date().getTime(), StateData: JSON.stringify(r)}));
      });
    } else
      SetPvpInfo(JSON.parse(stateData.StateData));
    navbarTitleContext.SetNavbarTitle("PVP");
    return () => {
      navbarTitleContext.SetNavbarTitle("");
    };
  }, []);
  const p1TotalTime = pvpInfo?.map((x) => x.Player1Time).reduce((accumulator, score) => accumulator + score, 0);
  const p2TotalTime = pvpInfo?.map((x) => x.Player2Time).reduce((accumulator, score) => accumulator + score, 0);
  let totalDifference = null;
  let leader = null;
  if (p1TotalTime && p2TotalTime) {
    totalDifference = ScoreFormatter2(Math.abs(p1TotalTime - p2TotalTime).toString());
    if (p1TotalTime === p2TotalTime)
      leader = `${name1} and ${name2} are equal`;
    else
      leader = `${p1TotalTime < p2TotalTime ? name1 : name2} is faster by ${totalDifference}`;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.leaderContainer
  }, "\u{1F3C6} ", leader, " \u{1F3C6}"), /* @__PURE__ */ React.createElement("table", {
    className: styles.table
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Level"), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Link, {
    to: `/persona/${platform1}/${persona1}/${name1}`
  }, name1)), /* @__PURE__ */ React.createElement("th", null, /* @__PURE__ */ React.createElement(Link, {
    to: `/persona/${platform2}/${persona2}/${name2}`
  }, name2)), /* @__PURE__ */ React.createElement("th", null, "Difference"))), /* @__PURE__ */ React.createElement("tbody", null, pvpInfo?.map((p, i) => {
    const href = `/leaderboard/${p.LevelId}`;
    const levelName = p.LevelName;
    const p1Time = ScoreFormatter2(p.Player1Time.toString());
    const p2Time = ScoreFormatter2(p.Player2Time.toString());
    const difference = ScoreFormatter2(Math.abs(p.Player1Time - p.Player2Time).toString());
    const fast = "highlight", slow = "red";
    let p1Color, p2Color;
    if (p.Player1Time < p.Player2Time) {
      p1Color = fast;
      p2Color = slow;
    } else {
      p1Color = slow;
      p2Color = fast;
    }
    return /* @__PURE__ */ React.createElement("tr", {
      key: i
    }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Link, {
      to: href
    }, levelName)), /* @__PURE__ */ React.createElement("td", {
      style: {color: p1Color}
    }, p1Time), /* @__PURE__ */ React.createElement("td", {
      style: {color: p2Color}
    }, p2Time), /* @__PURE__ */ React.createElement("td", null, difference));
  }), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, ScoreFormatter2(p1TotalTime?.toString())), /* @__PURE__ */ React.createElement("td", null, ScoreFormatter2(p2TotalTime?.toString())), /* @__PURE__ */ React.createElement("td", null)))));
};
export default Pvp;
