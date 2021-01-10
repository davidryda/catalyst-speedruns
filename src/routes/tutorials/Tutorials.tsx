import React, { useContext, useEffect } from 'react';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';

const Tutorials = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Tutorials");
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

    return (
        <div>
            Tutorials
        </div>
    );
}

export default Tutorials;