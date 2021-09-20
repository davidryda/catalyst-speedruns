import React, {useContext, useRef, useEffect, useCallback} from "../../../web_modules/react.js";
import styles from "./Settings.module.css.proxy.js";
import SettingsContext2 from "../../contexts/SettingsContext.js";
import Themes from "../../assets/design/themes.js";
import blur2 from "../../../icons/blur.svg.proxy.js";
import dark from "../../../icons/dark_mode.svg.proxy.js";
const Settings = () => {
  const settingsContext = useContext(SettingsContext2);
  const ref = useRef(null);
  const clickListener = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target))
      settingsContext.SetIsSettingsOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.background
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.containerFixed,
    ref
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.title
  }, "Settings"), /* @__PURE__ */ React.createElement("div", {
    className: styles.themeContainer
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.themeContainer
  }, "Theme"), Object.keys(Themes).filter((x) => isNaN(+x)).map((t) => {
    const themeValue = Themes[t];
    const iconStatus = settingsContext.theme === themeValue ? styles.activeThemeIcon : styles.nonActiveThemeIcon;
    let icon;
    switch (themeValue) {
      case Themes.Blur:
        icon = blur2;
        break;
      case Themes.Dark:
        icon = dark;
        break;
      default:
        icon = "";
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, {
      key: themeValue
    }, /* @__PURE__ */ React.createElement("button", {
      onClick: () => settingsContext.SetTheme(themeValue)
    }, /* @__PURE__ */ React.createElement("img", {
      className: iconStatus,
      src: icon
    })));
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.closeButton,
    onClick: () => settingsContext.SetIsSettingsOpen(false)
  }, "Close"))));
};
export default Settings;
