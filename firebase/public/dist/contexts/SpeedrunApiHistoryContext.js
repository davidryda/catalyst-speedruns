import React, {useState, createContext, useCallback} from "../../web_modules/react.js";
const SpeedrunApiHistoryContext = createContext(null);
export default SpeedrunApiHistoryContext;
export const SpeedrunApiHistoryContextController = (props) => {
  const [fetchHistory, SetApiHistory] = useState(new Map());
  const state = {
    FetchHistory: fetchHistory,
    SetApiHistory: useCallback((fetchHistory2) => {
      SetApiHistory(fetchHistory2);
    }, [])
  };
  return /* @__PURE__ */ React.createElement(SpeedrunApiHistoryContext.Provider, {
    value: state
  }, props.children);
};
