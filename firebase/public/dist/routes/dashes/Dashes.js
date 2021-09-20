import React, {useEffect, useContext} from "../../../web_modules/react.js";
import levels from "../../assets/Levels.js";
import styles from "./Dashes.module.css.proxy.js";
import {useHistory} from "../../../web_modules/react-router-dom.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
import SettingsContext2 from "../../contexts/SettingsContext.js";
import Themes from "../../assets/design/themes.js";
const Dashes = () => {
  const navbarTitleContext = useContext(NavbarTitleContext2);
  const settingsContext = useContext(SettingsContext2);
  const history = useHistory();
  useEffect(() => {
    navbarTitleContext.SetNavbarTitle("Dashes");
    return () => navbarTitleContext.SetNavbarTitle("");
  }, []);
  let levelButtons = levels.sort((a, b) => a.Name > b.Name ? 1 : -1).map((x) => {
    const style = settingsContext.theme === Themes.Blur ? {backgroundImage: `url(/pictures/${x.Id}.jpg)`} : {};
    return /* @__PURE__ */ React.createElement("button", {
      className: styles.button,
      key: x.Id,
      onClick: () => history.push(`/leaderboard/${x.Id}`)
    }, /* @__PURE__ */ React.createElement("div", {
      style,
      className: styles.buttonBackground
    }), /* @__PURE__ */ React.createElement("div", {
      className: styles.buttonNameContainer
    }, /* @__PURE__ */ React.createElement("span", {
      className: styles.buttonName
    }, x.Name)));
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, levelButtons);
};
export default Dashes;
