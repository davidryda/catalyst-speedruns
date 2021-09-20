import React, {useContext} from "../web_modules/react.js";
import styles from "./App.module.css.proxy.js";
import Home2 from "./routes/home/Home.js";
import Navbar2 from "./components/navbar/Navbar.js";
import Dashes2 from "./routes/dashes/Dashes.js";
import Leaderboard2 from "./routes/leaderboard/Leaderboard.js";
import NotFound2 from "./routes/not_found/NotFound.js";
import Persona2 from "./routes/persona/Persona.js";
import Pvp2 from "./routes/pvp/Pvp.js";
import {Switch, Route} from "../web_modules/react-router-dom.js";
import SettingsContext2 from "./contexts/SettingsContext.js";
import Settings2 from "./components/settings/Settings.js";
import Strats2 from "./routes/strats/Strats.js";
import Movement2 from "./routes/movement/Movement.js";
import Tutorials2 from "./routes/tutorials/Tutorials.js";
function App() {
  const settingsContext = useContext(SettingsContext2);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, settingsContext.isSettingsOpen && /* @__PURE__ */ React.createElement(Settings2, null), /* @__PURE__ */ React.createElement(Navbar2, null), /* @__PURE__ */ React.createElement("div", {
    className: styles.App
  }, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/",
    component: Home2
  }), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/dashes",
    component: Dashes2
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/leaderboard/:id",
    component: Leaderboard2
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/persona/:platform/:id/:runnerName",
    component: Persona2
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/pvp/:persona1/:platform1/:name1/:persona2/:platform2/:name2",
    component: Pvp2
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/strats",
    component: Strats2
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/movement",
    component: Movement2
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/tutorials",
    component: Tutorials2
  }), /* @__PURE__ */ React.createElement(Route, {
    component: NotFound2
  }))));
}
export default App;
