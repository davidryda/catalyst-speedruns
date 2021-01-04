import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    return (
        <div>
            <button onClick={() => history.push("/dashes")}>Dashes</button>
        </div>
    );
}

export default Home;