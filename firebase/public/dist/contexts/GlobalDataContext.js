import React, {createContext, useState, useCallback, useEffect} from "../../web_modules/react.js";
const GlobalDataContext = createContext(null);
export default GlobalDataContext;
export const GlobalDataContextController = (props) => {
  const [levels, SetLevels] = useState(null);
  useEffect(() => {
  }, []);
  const state = {
    Levels: levels,
    SetLevels: useCallback((levels2) => {
      SetLevels(levels2);
    }, [])
  };
  return /* @__PURE__ */ React.createElement(GlobalDataContext.Provider, {
    value: state
  }, props.children);
};
