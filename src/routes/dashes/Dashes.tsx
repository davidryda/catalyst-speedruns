import React, { Fragment, useEffect, useContext, CSSProperties } from 'react';
import levels from '../../assets/Levels';
import styles from './Dashes.module.css';
import { useHistory } from 'react-router-dom';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import SettingsContext from '../../contexts/SettingsContext';
import Themes from '../../assets/design/themes';

const Dashes = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);
    const settingsContext = useContext(SettingsContext);
    const history = useHistory();

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Dashes");
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

    let levelButtons = levels.sort((a, b) => a.Name > b.Name ? 1 : -1).map(x => {
        //const p = import.meta.env.SNOWPACK_PUBLIC_API_URL + "/pictures/" + x.Id + ".jpg";
        const style: CSSProperties = settingsContext.theme === Themes.Blur ? { backgroundImage: `url(/pictures/${x.Id}.jpg)` } : {};
        return (
            <button className={styles.button} key={x.Id} onClick={() => history.push(`/leaderboard/${x.Id}`)}>
                <div style={style} className={styles.buttonBackground} />
                <div className={styles.buttonNameContainer}><span className={styles.buttonName}>{x.Name}</span></div>
            </button>
        )
    });

    return (<div className={styles.container}>{levelButtons}</div>);
}

export default Dashes;