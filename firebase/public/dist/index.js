import __SNOWPACK_ENV__ from '../__snowpack__/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../web_modules/react.js";
import ReactDOM from "../web_modules/react-dom.js";
import App2 from "./App.js";
import "./index.css.proxy.js";
import "./assets/design/css-variables.css.proxy.js";
import {NavbarTitleContextController} from "./contexts/NavbarTitleContext.js";
import {BrowserRouter as Router} from "../web_modules/react-router-dom.js";
import {MirrorsEdgeApiHistoryContextController} from "./contexts/MirrorsEdgeApiHistoryContext.js";
import {SpeedrunApiHistoryContextController} from "./contexts/SpeedrunApiHistoryContext.js";
import {SettingsContextController} from "./contexts/SettingsContext.js";
import {GlobalDataContextController} from "./contexts/GlobalDataContext.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(SettingsContextController, null, /* @__PURE__ */ React.createElement(GlobalDataContextController, null, /* @__PURE__ */ React.createElement(MirrorsEdgeApiHistoryContextController, null, /* @__PURE__ */ React.createElement(SpeedrunApiHistoryContextController, null, /* @__PURE__ */ React.createElement(NavbarTitleContextController, null, /* @__PURE__ */ React.createElement(App2, null)))))))), document.getElementById("root"));
if (import.meta.hot) {
  import.meta.hot.accept();
}
