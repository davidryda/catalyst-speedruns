import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import websiteIcon from '../../../public/icons/mirrors_edge_icon_white.png';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);
    const location = useHistory();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <button onClick={() => location.push("/")} className={styles.websiteIconButton}><img src={websiteIcon} className={styles.websiteIcon} /></button>
                <div className={styles.navbarTitle}>{navbarTitleContext.navbarTitle}</div>
                <div className={styles.menu}>Menu</div>
            </div>
        </div>    
    );
}

export default Navbar;