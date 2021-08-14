import React, { useContext, useEffect, useState } from 'react';
import styles from './Strats.module.css';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import * as Api from '../../helpers/Api';
import type ILevel from '../../models/mirrorsedgecatalystapi/Level';
import GlobalDataContext from '../../contexts/GlobalDataContext';

const Strats = () => {
    const globalDataContext = useContext(GlobalDataContext);
    const navbarTitleContext = useContext(NavbarTitleContext);

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Strats");
        if (globalDataContext?.Levels === null) Api.FetchLevels().then(r => globalDataContext?.SetLevels(r));
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

    return (
        <div>
            {globalDataContext.Levels?.map(l => {
                return <div className={styles.container} key={l.Id} id={l.Id.toString()}>
                    {l.Name}
                </div>
            })}
        </div>
    );
}

export default Strats;