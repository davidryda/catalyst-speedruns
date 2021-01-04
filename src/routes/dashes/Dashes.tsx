import React, { Fragment } from 'react';
import levels from '../../assets/Levels';
import styles from './Dashes.module.css';
import { useHistory } from 'react-router-dom';

const Dashes = () => {
    const history = useHistory();

    console.log(origin);

    let levelButtons = levels.sort((a, b) => a.Name > b.Name ? 1 : -1).map(x => {
        //const p = import.meta.env.SNOWPACK_PUBLIC_API_URL + "/pictures/" + x.Id + ".jpg";
        return (
            <button className={styles.button} key={x.Id} onClick={() => history.push(`/leaderboard/${x.Id}`)}>
                <div style={{ backgroundImage: `url(/pictures/${x.Id}.jpg)` }} className={styles.buttonBackground} />
                <div className={styles.buttonNameContainer}><span className={styles.buttonName}>{x.Name}</span></div>
            </button>
        )
    });

    return (<div className={styles.container}>{levelButtons}</div>);
}

export default Dashes;