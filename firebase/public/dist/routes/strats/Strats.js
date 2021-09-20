import React, {useContext, useEffect} from "../../../web_modules/react.js";
import styles from "./Strats.module.css.proxy.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
import * as Api from "../../helpers/Api.js";
import GlobalDataContext2 from "../../contexts/GlobalDataContext.js";
const Strats = () => {
  const globalDataContext = useContext(GlobalDataContext2);
  const navbarTitleContext = useContext(NavbarTitleContext2);
  useEffect(() => {
    navbarTitleContext.SetNavbarTitle("Strats");
    if (globalDataContext?.Levels === null)
      Api.FetchLevels().then((r) => globalDataContext?.SetLevels(r));
    return () => navbarTitleContext.SetNavbarTitle("");
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, globalDataContext.Levels?.map((l) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: styles.container,
      key: l.Id,
      id: l.Id.toString()
    }, l.Name);
  }));
};
export default Strats;
