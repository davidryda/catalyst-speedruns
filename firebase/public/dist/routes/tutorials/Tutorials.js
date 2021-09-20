import React, {useContext, useEffect} from "../../../web_modules/react.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
const Tutorials = () => {
  const navbarTitleContext = useContext(NavbarTitleContext2);
  useEffect(() => {
    navbarTitleContext.SetNavbarTitle("Tutorials");
    return () => navbarTitleContext.SetNavbarTitle("");
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, "Tutorials");
};
export default Tutorials;
