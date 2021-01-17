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
                    <button onClick={() => location.push("/dashes")}>Dashes</button>
                    <button onClick={() => location.push("/strats")}>Strats</button>
                    <button onClick={() => location.push("/movement")}>Movement</button>
                    <button onClick={() => location.push("/tutorials")}>Tutorials</button>
                    <button onClick={() => settingsContext.SetIsSettingsOpen(true)}>Settings</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;