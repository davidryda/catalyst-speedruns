import React, { useContext, useEffect, useState } from 'react';
import styles from './Strats.module.css';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import * as Api from '../../helpers/Api';
import type ILevel from '../../models/mirrorsedgecatalystapi/Level';

const Strats = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);
    const [levels, SetLevels] = useState<ILevel[]>([]);

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Strats");
        Api.FetchLevels().then(r => {
            console.log(r);
            SetLevels(r);
        });
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

    return (
        <div>
            {levels?.map(l => {
                return <div className={styles.container} key={l.Id} id={l.Id.toString()}>
                    {l.Name}
                </div>
            })}
        </div>
    );
}

export default Strats;