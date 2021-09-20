import React, {useContext, useState} from "../../../web_modules/react.js";
import styles from "./Navbar.module.css.proxy.js";
import websiteIcon from "../../../icons/mirrors_edge_icon_white.png.proxy.js";
import NavbarTitleContext2 from "../../contexts/NavbarTitleContext.js";
import {useHistory} from "../../../web_modules/react-router-dom.js";
import menuIcon from "../../../icons/menu.svg.proxy.js";
import menuOpenIcon from "../../../icons/menu_open.svg.proxy.js";
import SettingsContext2 from "../../contexts/SettingsContext.js";
const Navbar = () => {
  const settingsContext = useContext(SettingsContext2);
  const navbarTitleContext = useContext(NavbarTitleContext2);
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const location = useHistory();
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.position
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.content
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.websiteIconContainer
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => location.push("/")
  }, /* @__PURE__ */ React.createElement("img", {
    src: websiteIcon
  }))), /* @__PURE__ */ React.createElement("div", {
    className: styles.navbarTitle
  }, navbarTitleContext.navbarTitle), /* @__PURE__ */ React.createElement("div", {
    className: styles.menuButtonContainer
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => SetIsMenuOpen(!isMenuOpen)
  }, /* @__PURE__ */ React.createElement("img", {
    src: isMenuOpen ? menuOpenIcon : menuIcon
  }))))), /* @__PURE__ */ React.createElement("div", {
    onClick: () => SetIsMenuOpen(false),
    className: isMenuOpen ? styles.menuBackdrop : styles.menuClosed
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.menu
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => location.push("/dashes")
  }, "Dashes"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => location.push("/strats")
  }, "Strats"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => location.push("/movement")
  }, "Movement"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => location.push("/tutorials")
  }, "Tutorials"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => settingsContext.SetIsSettingsOpen(true)
  }, "Settings"))));
};
export default Navbar;
