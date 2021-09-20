import React, {useState, createContext, useCallback} from "../../web_modules/react.js";
const MirrorsEdgeApiHistoryContext = createContext(null);
export default MirrorsEdgeApiHistoryContext;
export const MirrorsEdgeApiHistoryContextController = (props) => {
  const [fetchHistory, SetApiHistory] = useState(new Map());
  const state = {
    FetchHistory: fetchHistory,
    SetApiHistory: useCallback((fetchHistory2) => {
      SetApiHistory(fetchHistory2);
    }, [])
  };
  return /* @__PURE__ */ React.createElement(MirrorsEdgeApiHistoryContext.Provider, {
    value: state
  }, props.children);
};
