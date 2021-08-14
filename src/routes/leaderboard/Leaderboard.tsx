import React, { Fragment, useContext, useState, useEffect, CSSProperties } from 'react';
import levels from '../../assets/Levels';
import ScoreFormatter from '../../helpers/ScoreFormatter';
import GetLevelName from '../../helpers/GetLevelName';
import styles from './Leaderboard.module.css';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';
import xbox from '../../../public/icons/xbox.svg';
import playstation from '../../../public/icons/playstation_white.svg';
import pc from '../../../public/icons/origin.svg';
import globe from '../../../public/icons/globe.svg';
import { useLocation, useHistory, useParams, Link } from 'react-router-dom';
import MirrorsEdgeApiHistoryContext from '../../contexts/MirrorsEdgeApiHistoryContext';
import type ILeaderboardStateEntities from '../../models/LeaderboardStateEntities';
import * as Api from '../../helpers/Api';
import type IPlayerSelectInfo from '../../models/PalyerSelectInfo';
import SpeedrunApiHistoryContext from '../../contexts/SpeedrunApiHistoryContext';
import EllipsisLoader from '../../components/loaders/EllipsisLoader';
import SettingsContext from '../../contexts/SettingsContext';
import Themes from '../../assets/design/themes';

interface IRouteParams {
    id: string;
}

const Leaderboard = () => {
    const [state, SetState] = useState<ILeaderboardStateEntities | null>(null);
    const [fastestAvailableRunLink, SetFastestAvailableRunLink] = useState<string | undefined>();
    const settingsContext = useContext(SettingsContext);
    const navbarTitleContext = useContext(NavbarTitleContext);
    const mirrorsEdgeApiHistory = useContext(MirrorsEdgeApiHistoryContext);
    const speedrunApiHistory = useContext(SpeedrunApiHistoryContext);
    let params = useParams<IRouteParams>();
    let location = useLocation();
    let history = useHistory();

    if (params == null) history.replace("/");
    if (levels.map(x => x.Id).indexOf(params.id) < 0) history.replace("/");

    useEffect(() => {
        //this call is for the leaderboard information from the mirror's edge api
        const mirrorsEdgeStateData = mirrorsEdgeApiHistory.FetchHistory.get(location.pathname);
        if (mirrorsEdgeStateData === undefined || new Date().getTime() - mirrorsEdgeStateData?.FetchTime > (300 * 1000)) {
            Api.GetRunnersRouteLeaderboards(params.id).then(r => {
                SetState(r);
                mirrorsEdgeApiHistory.SetApiHistory(mirrorsEdgeApiHistory.FetchHistory.set(location.pathname, { FetchTime: new Date().getTime(), StateData: JSON.stringify(r) }))
            })
        } else SetState((JSON.parse(mirrorsEdgeStateData.StateData)) as ILeaderboardStateEntities);

        //this call is for the fastest available run video link
        const speedrunStateData = speedrunApiHistory.FetchHistory.get(location.pathname);
        if (speedrunStateData === undefined || new Date().getTime() - speedrunStateData?.FetchTime > (300 * 1000)) {
            Api.GetFastestAvailableRunVideoLink(params.id).then(r => {
                SetFastestAvailableRunLink(r);
                speedrunApiHistory.SetApiHistory(speedrunApiHistory.FetchHistory.set(location.pathname, { FetchTime: new Date().getTime(), StateData: JSON.stringify(r) }))
            })
        } else SetFastestAvailableRunLink((JSON.parse(speedrunStateData.StateData)) as string);

        navbarTitleContext.SetNavbarTitle(GetLevelName(params.id));

        return () => {
            navbarTitleContext.SetNavbarTitle("");
        }
    }, []);

    const pvpOptions = [...state?.Leaderboard || []]
        .sort((a, b) => a.name?.toLowerCase().localeCompare(b.name?.toLowerCase()))
        .map(x => <option key={x.personaId} value={JSON.stringify({ PersonaId: x.personaId, Platform: x.platform, Name: x.name })}>{x.name}</option>);

    const player1SelectId = "player1", player2SelectId = "player2";
    const Pvp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const a = e.currentTarget[player1SelectId] as React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
        const b = e.currentTarget[player2SelectId] as React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
        if (!a.value || !b.value) return alert(`${(a.value ? "" : "Player 1 is undefined!")} ${(b.value ? "" : "Player 2 is undefined!")}`.trim());
        const p1 = JSON.parse(a.value.toString()) as IPlayerSelectInfo;
        const p2 = JSON.parse(b.value.toString()) as IPlayerSelectInfo;
        history.push(`/pvp/${p1.PersonaId}/${p1.Platform}/${p1.Name}/${p2.PersonaId}/${p2.Platform}/${p2.Name}`);
    }

    const GetIcon = (platform: string): string => {
        let icon: string;
        switch (platform) {
            case "pc": icon = pc; break;
            case "ps4": icon = playstation; break;
            case "xboxone": icon = xbox; break;
            default: icon = globe; break;
        };
        return icon;
    }

    const backgroundStyle: CSSProperties = settingsContext.theme === Themes.Blur ? { backgroundImage: `url(/pictures/${params.id}.jpg)` } : {};

    return (
        <Fragment>
            <div style={backgroundStyle} className={styles.background}>
                <div className={styles.backgroundColorLayer} />
            </div>
            <div className={styles.container}>
                <div className={styles.platformCountContainer}>
                    {state?.PlatformRunCounts?.map((x, i) => {
                        return <div key={i}>
                            <img src={GetIcon(x.Platform)} /><span>{x.RunCount.toLocaleString()}</span>
                        </div>
                    })}
                </div>
                <div className={styles.pvpContainer}>
                    <form onSubmit={e => Pvp(e)}>
                        <select id={player1SelectId}><option value={undefined}></option>{pvpOptions}</select>
                        <button type="submit">Go!</button>
                        <select id={player2SelectId}><option value={undefined}></option>{pvpOptions}</select>
                    </form>
                </div>
                <div className={styles.fastestAvailableRunContainer}>
                    {!fastestAvailableRunLink ? <EllipsisLoader /> : <a href={fastestAvailableRunLink} target="_blank" rel="noopener noreferrer">View Fastest Available Run</a>}
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Runner</th>
                            <th>Score</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state?.Leaderboard?.map((x, i) => {
                            return (
                                <tr key={i} id={x.personaId}>
                                    <td>{i + 1}</td>
                                    <td><Link to={`/persona/${x.platform}/${x.personaId}/${x.name ?? "[Name not found]"}`}>{x.name ?? "[Name not found]"}</Link></td>
                                    <td>{ScoreFormatter(x.score)}</td>
                                    <td><img src={GetIcon(x.platform)} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default Leaderboard;