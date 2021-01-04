import React from 'react';
import styles from './App.module.css';
import Home from './routes/home/Home';
import Navbar from './components/navbar/Navbar';
import Dashes from './routes/dashes/Dashes';
import Leaderboard from './routes/leaderboard/Leaderboard';
import NotFound from './routes/not_found/NotFound';
import Persona from './routes/persona/Persona';
import Pvp from './routes/pvp/Pvp';
import { Switch, Route } from 'react-router-dom';

function App() {
    // Create the count state.
    //const [count, setCount] = PreactHooks.useState(0);
    // Create the counter (+1 every second).
    //PreactHooks.useEffect(() => {
    //const timer = setTimeout(() => setCount(count + 1), 1000);
    //return () => clearTimeout(timer);
    //}, [count, setCount]);

    return (
        <>
            <Navbar />
            <div className={styles.App}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashes" component={Dashes} />
                    <Route path="/leaderboard/:id" component={Leaderboard} />
                    <Route path="/persona/:platform/:id/:runnerName" component={Persona} />
                    <Route path="/pvp/:persona1/:platform1/:name1/:persona2/:platform2/:name2" component={Pvp} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </>
    );
}

export default App;
