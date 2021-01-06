import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    return (
        <div>
            <button onClick={() => history.push("/dashes")}>Dashes</button>
            <button onClick={() => history.push("/strats")}>Strats</button>
            <button onClick={() => history.push("/movement")}>Movement</button>
            <button onClick={() => history.push("/tutorials")}>Tutorials</button>
        </div>
    );
}

export default Home;