import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import styles from './Navbar.module.css';
import websiteIcon from '../../../public/icons/mirrors_edge_icon_white.png';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import { useHistory } from 'react-router-dom';
import menuIcon from '../../../public/icons/menu.svg';
import menuOpenIcon from '../../../public/icons/menu_open.svg';
import SettingsContext from '../../contexts/SettingsContext';

const Navbar = () => {
    const settingsContext = useContext(SettingsContext);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const [isMenuOpen, SetIsMenuOpen] = useState<boolean>(false);
    const location = useHistory();

    //const clickListener = useCallback((e: MouseEvent) => {
    //    if (isMenuOpen) SetIsMenuOpen(false)
    //}, []);

    //useEffect(() => {
    //    document.addEventListener("click", clickListener);
    //    return () => document.removeEventListener("click", clickListener);
    //}, []);

    const menuHandler = (route: string) => {
        switch (route) {
            case "/dashes": location.push(route); break;
            case "/strats": location.push(route); break;
            case "/movement": location.push(route); break;
            case "/tutorials": location.push(route); break;
            case "settings": settingsContext.SetIsSettingsOpen(true); break;
            default: location.push("/"); break;
        }
    }

    return (
        <div className={styles.position}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.websiteIconContainer}><button onClick={() => location.push("/")}><img src={websiteIcon} /></button></div>
                    <div className={styles.navbarTitle}>{navbarTitleContext.navbarTitle}</div>
                    <div className={styles.menuButtonContainer}><button onClick={() => SetIsMenuOpen(!isMenuOpen)}><img src={isMenuOpen ? menuOpenIcon : menuIcon} /></button></div>
                </div>
            </div>
            <div onClick={() => SetIsMenuOpen(false)} className={isMenuOpen ? styles.menuBackdrop : styles.menuClosed}>
                <div className={styles.menu}>
                    <button onClick={() => menuHandler("/dashes")}>Dashes</button>
                    <button onClick={() => menuHandler("/strats")}>Strats</button>
                    <button onClick={() => menuHandler("/movement")}>Movement</button>
                    <button onClick={() => menuHandler("/tutorials")}>Tutorials</button>
                    <button onClick={() => menuHandler("settings")}>Settings</button>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;