import React, { useContext, useEffect } from 'react';
import NavbarTitleContext from '../../contexts/NavbarTitleContext';

const Movement = () => {
    const navbarTitleContext = useContext(NavbarTitleContext);

    useEffect(() => {
        navbarTitleContext.SetNavbarTitle("Movement");
        return () => navbarTitleContext.SetNavbarTitle("");
    }, []);

    return (
        <div>
            Movement
        </div>
    );
}

export default Movement;