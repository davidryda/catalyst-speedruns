import React, {useEffect, useContext} from "../../../web_modules/react.js";
import {useHistory} from "../../../web_modules/react-router-dom.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
const Home = () => {
  const navbarTitleContext = useContext(NavbarTitleContext2);
  const history = useHistory();
  useEffect(() => {
    navbarTitleContext.SetNavbarTitle("Mirror's Edge Catalyst");
    return () => navbarTitleContext.SetNavbarTitle("");
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    onClick: () => history.push("/dashes")
  }, "Dashes"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => history.push("/strats")
  }, "Strats"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => history.push("/movement")
  }, "Movement"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => history.push("/tutorials")
  }, "Tutorials"));
};
export default Home;
