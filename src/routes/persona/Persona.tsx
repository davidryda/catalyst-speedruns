import React, { useContext } from 'react';
import levels from '../../assets/Levels';
import ScoreFormatter from '../../helpers/ScoreFormatter';
import GetLevelName from '../../helpers/GetLevelName';
import { useState, useEffect } from 'react';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import styles from './Persona.module.css';
import { useParams, Link } from 'react-router-dom';
import * as Api from '../../helpers/Api';
import MirrorsEdgeApiHistoryContext from '../../contexts/MirrorsEdgeApiHistoryContext';
import type IResultItem from '../../models/ResultItem';

interface IRouteParams {
    platform: string;
    id: string;
    runnerName: string;
}

const Persona = () => {
    const [resultItems, SetResultItems] = useState<IResultItem[] | null>(null);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext);
    let params = useParams<IRouteParams>();
    const runnerName = params?.runnerName;
    const platform = params?.platform;
    const personaId = params?.id;

    useEffect(() => {
        const key = platform + personaId;
        const stateData = mirrorsEdgeApiHistory.FetchHistory.get(key);
        if (stateData === undefined || new Date().getTime() - stateData?.FetchTime > (300 * 1000)) {
            Api.GetRunnersRouteData(personaId, platform).then(r => {
                SetResultItems(r);
                mirrorsEdgeApiHistory.SetApiHistory(mirrorsEdgeApiHistory.FetchHistory.set(key, { FetchTime: new Date().getTime(), StateData: JSON.stringify(r) }))
            })
        } else SetResultItems((JSON.parse(stateData.StateData)) as IResultItem[]);

        navbarTitleContext.SetNavbarTitle(runnerName);

        return () => {
            navbarTitleContext.SetNavbarTitle("");
        }
    }, []);

    let totalTime = ScoreFormatter(resultItems?.map(x => x.userRank?.score ?? "0").reduce((a, b) => +a + +b, 0).toString());

    const SortResultItems = (sortOption: string) => {
        switch (sortOption) {
            case "score_asc": SetResultItems([...resultItems || []].sort((a, b) => +a.userRank?.score - +b.userRank?.score)); break;
            case "score_desc": SetResultItems([...resultItems || []].sort((a, b) => +b.userRank?.score - +a.userRank?.score)); break;
            case "level_asc": SetResultItems([...resultItems || []].sort((a, b) => (GetLevelName(a.id) > GetLevelName(b.id)) ? 1 : -1)); break;
            case "level_desc": SetResultItems([...resultItems || []].sort((a, b) => (GetLevelName(a.id) < GetLevelName(b.id)) ? 1 : -1)); break;
            case "date_asc": SetResultItems([...resultItems || []].sort((a, b) => +a.userStats?.finishedAt - +b.userStats?.finishedAt)); break;
            case "date_desc": SetResultItems([...resultItems || []].sort((a, b) => +b.userStats?.finishedAt - +a.userStats?.finishedAt)); break;
        }
    }

    return (
        <div className={styles.container}>
            <select onChange={(e) => SortResultItems(e.currentTarget.value)}>
                <option value="score_asc">Score: Asc</option>
                <option value="score_desc">Score: Desc</option>
                <option value="level_asc">Level: Asc</option>
                <option value="level_desc">Level: Desc</option>
                <option value="date_asc">Date: Asc</option>
                <option value="date_desc">Date: Desc</option>
            </select>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {resultItems?.map((r, i) => {
                        const date = new Date(+r.userStats?.finishedAt);
                        const month = date.getUTCMonth() + 1;
                        const day = date.getUTCDate();
                        const year = date.getUTCFullYear();
                        const href = `/leaderboard/${r.id}`
                        const levelName = levels.find(x => x.Id === r.id)?.Name;
                        const score = ScoreFormatter(r.userStats?.finishTime)
                        const dateObtained = r.userStats?.finishedAt == null ? null : `${month}/${day}/${year}`;
                        return (
                            <tr key={i}>
                                <td><Link to={href}>{levelName}</Link></td>
                                <td>{score}</td>
                                <td>{dateObtained}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td>{totalTime}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Persona;