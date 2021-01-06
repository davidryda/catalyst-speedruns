import React, { useContext } from 'react';
import styles from './App.module.css';
import Home from './routes/home/Home';
import Navbar from './components/navbar/Navbar';
import Dashes from './routes/dashes/Dashes';
import Leaderboard from './routes/leaderboard/Leaderboard';
import NotFound from './routes/not_found/NotFound';
import Persona from './routes/persona/Persona';
import Pvp from './routes/pvp/Pvp';
import { Switch, Route } from 'react-router-dom';
import SettingsContext from './contexts/SettingsContext';
import Settings from './components/settings/Settings';
import Strats from './routes/strats/Strats';
import Movement from './routes/movement/Movement';
import Tutorials from './routes/tutorials/Tutorials';

function App() {
    const settingsContext = useContext(SettingsContext);

    return (
        <>
            {settingsContext.isSettingsOpen && <Settings />}
            <Navbar />
            <div className={styles.App}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashes" component={Dashes} />
                    <Route path="/leaderboard/:id" component={Leaderboard} />
                    <Route path="/persona/:platform/:id/:runnerName" component={Persona} />
                    <Route path="/pvp/:persona1/:platform1/:name1/:persona2/:platform2/:name2" component={Pvp} />
                    <Route path="/strats" component={Strats} />
                    <Route path="/movement" component={Movement} />
                    <Route path="/tutorials" component={Tutorials} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </>
    );
}

export default App;
