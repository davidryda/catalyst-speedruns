import React, { useContext, useRef, useEffect, useCallback } from 'react';
import styles from './Settings.module.css';
import SettingsContext from '../../contexts/SettingsContext';
import Themes from '../../assets/design/themes';
import blur from '../../../public/icons/blur.svg';
import dark from '../../../public/icons/dark_mode.svg';

const Settings = () => {
    const settingsContext = useContext(SettingsContext);
    const ref = useRef<HTMLDivElement>(null);

    const clickListener = useCallback((e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) settingsContext.SetIsSettingsOpen(false)
    }, []);

    useEffect(() => {
        document.addEventListener("click", clickListener);
        return () => document.removeEventListener("click", clickListener);
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.containerFixed} ref={ref}>
                <div className={styles.container}>
                    <div className={styles.title}>Settings</div>
                    <div className={styles.themeContainer}>
                        <div className={styles.themeContainer}>Theme</div>
                        {
                            //.filter(x => isNaN(+x)) takes a list of strings, tries to convert the string 
                            //to a number then checks if that converted number is actaully NOT a number...
                            //if the value is a number, the value is not returned
                            Object.keys(Themes).filter(x => isNaN(+x)).map(t => {
                                const themeValue = Themes[t as keyof typeof Themes];
                                const iconStatus = settingsContext.theme === themeValue ? styles.activeThemeIcon : styles.nonActiveThemeIcon;
                                let icon;
                                switch (themeValue) {
                                    case Themes.Blur: icon = blur; break;
                                    case Themes.Dark: icon = dark; break;
                                    default: icon = "";
                                }
                                return <React.Fragment key={themeValue}>
                                    <button onClick={() => settingsContext.SetTheme(themeValue)}>
                                        <img className={iconStatus} src={icon} />
                                    </button>
                                </React.Fragment>
                            })
                        }
                    </div>
                    <div className={styles.closeButton} onClick={() => settingsContext.SetIsSettingsOpen(false)}>Close</div>
                </div>
            </div>
        </div>
    );
}

export default Settings;