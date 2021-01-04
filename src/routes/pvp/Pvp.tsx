import React, { useContext, useEffect, useState } from 'react';
import styles from './Pvp.module.css';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import { useParams, useHistory, useRouteMatch, Link } from 'react-router-dom';
import MirrorsEdgeApiHistoryContext from '../../contexts/MirrorsEdgeApiHistoryContext';
import * as Api from '../../helpers/Api';
import type IPvpInfo from '../../models/PvpInfo';
import ScoreFormatter from '../../helpers/ScoreFormatter';

interface IRouteParams {
    persona1: string;
    platform1: string;
    name1: string;
    persona2: string;
    platform2: string;
    name2: string;
}

const Pvp = () => {
    const [pvpInfo, SetPvpInfo] = useState<IPvpInfo[] | null>(null);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext);
    const params = useParams<IRouteParams>();
    let match = useRouteMatch("/pvp/:persona1/:platform1/:name1/:persona2/:platform2/:name2");
    const location = useHistory();

    if (params == null) location.push("/");
    //if (!Object.values(params).every(x => x)) return <Redirect to="/" />;

    const { persona1, platform1, name1, persona2, platform2, name2 } = params;

    useEffect(() => {
        const key = persona1 + persona2;
        const stateData = mirrorsEdgeApiHistory.FetchHistory.get(key);
        if (stateData === undefined || new Date().getTime() - stateData?.FetchTime > (300 * 1000)) {
            Api.GetPlayersPvpRouteData(persona1, platform1, persona2, platform2).then(r => {
                SetPvpInfo(r);
                mirrorsEdgeApiHistory.SetApiHistory(mirrorsEdgeApiHistory.FetchHistory.set(key, { FetchTime: new Date().getTime(), StateData: JSON.stringify(r) }))
            })
        } else SetPvpInfo((JSON.parse(stateData.StateData)) as IPvpInfo[]);

        navbarTitleContext.SetNavbarTitle("PVP");

        return (() => {
            navbarTitleContext.SetNavbarTitle("");
        }); 
    }, []);

    const p1TotalTime = pvpInfo?.map(x => x.Player1Time).reduce((accumulator, score) => accumulator + score, 0);
    const p2TotalTime = pvpInfo?.map(x => x.Player2Time).reduce((accumulator, score) => accumulator + score, 0);

    let totalDifference = null;
    let leader = null;
    if (p1TotalTime && p2TotalTime) {
        totalDifference = ScoreFormatter(Math.abs(p1TotalTime - p2TotalTime).toString());
        if (p1TotalTime === p2TotalTime) leader = `${name1} and ${name2} are equal`;
        else leader = `${p1TotalTime < p2TotalTime ? name1 : name2} is faster by ${totalDifference}`;
    }

    return (
        <div className={styles.container}>
            <div className={styles.leaderContainer}>&#x1F3C6; {leader} &#x1F3C6;</div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th><Link to={`/persona/${platform1}/${persona1}/${name1}`}>{name1}</Link></th>
                        <th><Link to={`/persona/${platform2}/${persona2}/${name2}`}>{name2}</Link></th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <tbody>
                    {pvpInfo?.map((p, i) => {
                        const href = `/leaderboard/${p.LevelId}`;
                        const levelName = p.LevelName
                        const p1Time = ScoreFormatter(p.Player1Time.toString());
                        const p2Time = ScoreFormatter(p.Player2Time.toString());
                        const difference = ScoreFormatter(Math.abs(p.Player1Time - p.Player2Time).toString());
                        const fast = "highlight", slow = "red";
                        let p1Color: string, p2Color: string;
                        if (p.Player1Time < p.Player2Time) { p1Color = fast; p2Color = slow; }
                        else { p1Color = slow; p2Color = fast; }
                        return (
                            <tr key={i}>
                                <td><Link to={href}>{levelName}</Link></td>
                                <td style={{ color: p1Color }}>{p1Time}</td>
                                <td style={{ color: p2Color }}>{p2Time}</td>
                                <td>{difference}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td>{ScoreFormatter(p1TotalTime?.toString())}</td>
                        <td>{ScoreFormatter(p2TotalTime?.toString())}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Pvp;