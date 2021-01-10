import React, { useContext, useEffect } from 'react';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';

const Strats = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Strats");
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

    return (
        <div>
            ...
        </div>
    );
}

export default Strats;