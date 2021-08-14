import React, { useContext, useCallback } from 'react';
import levels from '../../assets/Levels';
import ScoreFormatter from '../../helpers/ScoreFormatter';
import GetLevelName from '../../helpers/GetLevelName';
import { useState, useEffect } from 'react';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import styles from './Persona.module.css';
import { useParams, Link, useLocation, useHistory } from 'react-router-dom';
import * as Api from '../../helpers/Api';
import MirrorsEdgeApiHistoryContext from '../../contexts/MirrorsEdgeApiHistoryContext';
import type IResultItem from '../../models/ResultItem';

interface IRouteParams {
    platform: string;
    id: string;
    runnerName: string;
}

interface ISearchParams {
    sortOrder?: string;
}

const Persona = () => {
    const [resultItems, SetResultItems] = useState<IResultItem[] | null>(null);
    const [currentSortOrder, SetCurrentSortOrder] = useState<string>();
    const navbarTitleContext = useContext(NavbarTitleContext);
    const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext);
    //let location = useLocation();
    let params = useParams<IRouteParams>();
    //let history = useHistory();
    const runnerName = params?.runnerName;
    const platform = params?.platform;
    const personaId = params?.id;
    //const searchParams = Object.fromEntries(new URLSearchParams(location.search)) as ISearchParams;

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

    const SortResultItems = (sortOrder: string) => {
        //history.replace({ search: `?sortOrder=${sortOrder}` });
        SetCurrentSortOrder(sortOrder);
        switch (sortOrder) {
            case "score_asc": SetResultItems([...resultItems || []].sort((a, b) => +a.userRank?.score - +b.userRank?.score)); break;
            case "score_desc": SetResultItems([...resultItems || []].sort((a, b) => +b.userRank?.score - +a.userRank?.score)); break;
            case "level_asc": SetResultItems([...resultItems || []].sort((a, b) => (GetLevelName(a.id) > GetLevelName(b.id)) ? 1 : -1)); break;
            case "level_desc": SetResultItems([...resultItems || []].sort((a, b) => (GetLevelName(a.id) < GetLevelName(b.id)) ? 1 : -1)); break;
            case "date_asc": SetResultItems([...resultItems || []].sort((a, b) => +a.userStats?.finishedAt - +b.userStats?.finishedAt)); break;
            case "date_desc": SetResultItems([...resultItems || []].sort((a, b) => +b.userStats?.finishedAt - +a.userStats?.finishedAt)); break;
        }
    }

    let sortOrderIcon;
    switch (currentSortOrder) {
        case "score_asc":
        case "level_asc":
        case "date_asc":
            sortOrderIcon = <span>&#9650;</span>; break;
        case "score_desc":
        case "level_desc":
        case "date_desc":
            sortOrderIcon = <span>&#9660;</span>; break;
        default: ""; break;
    }

    const levelSortFunc = currentSortOrder === "level_asc" ? "level_desc" : "level_asc";
    const scoreSortFunc = currentSortOrder === "score_asc" ? "score_desc" : "score_asc";
    const dateSortFunc = currentSortOrder === "date_asc" ? "date_desc" : "date_asc";

    const levelSortIcon = currentSortOrder === "level_asc" || currentSortOrder === "level_desc" ? sortOrderIcon : null;
    const scoreSortIcon = currentSortOrder === "score_asc" || currentSortOrder === "score_desc" ? sortOrderIcon : null;
    const dateSortIcon = currentSortOrder === "date_asc" || currentSortOrder === "date_desc" ? sortOrderIcon : null;

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => SortResultItems(levelSortFunc)}>Level {levelSortIcon}</th>
                        <th onClick={() => SortResultItems(scoreSortFunc)}>Score {scoreSortIcon}</th>
                        <th onClick={() => SortResultItems(dateSortFunc)}>Date {dateSortIcon}</th>
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
                        const score = ScoreFormatter(r.userRank?.score)
                        const dateObtained = (r.userStats?.finishedAt === null || r.userStats?.finishedAt === "0") ? null : `${month}/${day}/${year}`;
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