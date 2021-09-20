import React, {createContext, useState, useCallback} from "../../web_modules/react.js";
const NavbarTitleContext = createContext(null);
export default NavbarTitleContext;
export const NavbarTitleContextController = (props) => {
  const [navbarTitle, SetNavbarTitle] = useState("");
  const state = {
    navbarTitle,
    SetNavbarTitle: useCallback((navTitle) => {
      SetNavbarTitle(navTitle);
    }, [])
  };
  return /* @__PURE__ */ React.createElement(NavbarTitleContext.Provider, {
    value: state
  }, props.children);
};
