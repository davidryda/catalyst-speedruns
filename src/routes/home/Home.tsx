import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';

const Home = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);
    const history = useHistory();

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Mirror's Edge Catalyst");
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

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