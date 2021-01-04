import React, { createContext, useState, useCallback } from "react";

interface INavbarTitleContext {
    navbarTitle: string;
    SetNavbarTitle: (navTitle: string) => void;
}

const NavbarTitleContext = createContext<INavbarTitleContext>(null as any);
export default NavbarTitleContext;

export const NavbarTitleContextController = (props: { children: any }) => {
    const [navbarTitle, SetNavbarTitle] = useState<string>("");

    const state: INavbarTitleContext = {
        navbarTitle: navbarTitle,
        SetNavbarTitle: useCallback((navTitle: string) => {
            SetNavbarTitle(navTitle);
        }, [])
    }

    return (
        <NavbarTitleContext.Provider value={state}>
            {props.children}
        </NavbarTitleContext.Provider>
    );
}