import React, {useContext, useEffect} from "../../../web_modules/react.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
const Movement = () => {
  const navbarTitleContext = useContext(NavbarTitleContext2);
  useEffect(() => {
    navbarTitleContext.SetNavbarTitle("Movement");
    return () => navbarTitleContext.SetNavbarTitle("");
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, "Movement");
};
export default Movement;
