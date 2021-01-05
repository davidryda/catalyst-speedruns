import React, { useContext, useState } from 'react';
import styles from './Navbar.module.css';
import websiteIcon from '../../../public/icons/mirrors_edge_icon_white.png';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import { useHistory } from 'react-router-dom';
import menuIcon from '../../../public/icons/menu.svg';
import menuOpenIcon from '../../../public/icons/menu_open.svg';

const Navbar = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);
    const [isMenuOpen, SetIsMenuOpen] = useState<boolean>(false);
    const location = useHistory();

    return (
        <div className={styles.position}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.websiteIconContainer}><button onClick={() => location.push("/")}><img src={websiteIcon} /></button></div>
                    <div onClick={() => SetIsMenuOpen(!isMenuOpen)} className={styles.navbarTitle}>{navbarTitleContext.navbarTitle}</div>
                    <div className={styles.menuButtonContainer}><button onClick={() => SetIsMenuOpen(!isMenuOpen)}><img src={isMenuOpen ? menuOpenIcon : menuIcon} /></button></div>
                </div>
            </div>
            <div className={isMenuOpen ? styles.menu : styles.menuClosed}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
            </div>
        </div>
    );
}

export default Navbar;