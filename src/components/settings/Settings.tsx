import React, { useContext, useRef, RefObject, useEffect, useCallback } from 'react';
import styles from './Settings.module.css';
import SettingsContext from '../../contexts/SettingsContext';


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
            <div className={styles.container} ref={ref}>
                Settings...
            </div>
        </div>
    );
}

export default Settings;