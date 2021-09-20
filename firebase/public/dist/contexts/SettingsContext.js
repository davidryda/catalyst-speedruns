import React, {createContext, useState, useCallback, useEffect} from "../../web_modules/react.js";
import Themes from "../assets/design/themes.js";
const SettingsContext = createContext(null);
export default SettingsContext;
export const SettingsContextController = (props) => {
  const [isSettingsOpen, SetIsSettingsOpen] = useState(false);
  const [theme, SetTheme] = useState(Themes.Blur);
  useEffect(() => {
    const validThemes = Object.keys(Themes).filter((x) => Number.isInteger(+x)).map((x) => +x);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null && Number.isInteger(+storedTheme) && validThemes.includes(+storedTheme))
      SetTheme(JSON.parse(storedTheme));
  }, []);
  const state = {
    isSettingsOpen,
    SetIsSettingsOpen: useCallback((isSettingsOpen2) => {
      SetIsSettingsOpen(isSettingsOpen2);
    }, []),
    theme,
    SetTheme: useCallback((theme2) => {
      localStorage.setItem("theme", theme2.toString());
      SetTheme(theme2);
    }, [])
  };
  return /* @__PURE__ */ React.createElement(SettingsContext.Provider, {
    value: state
  }, props.children);
};
