import React, { createContext, useState, useCallback, useEffect } from "react";
import Themes from "../assets/design/themes";

interface ISettingsContext {
    isSettingsOpen: boolean;
    SetIsSettingsOpen: (isSettingsOpen: boolean) => void;
    theme: Themes;
    SetTheme: (theme: Themes) => void;
}

const SettingsContext = createContext<ISettingsContext>(null as any);
export default SettingsContext;

export const SettingsContextController = (props: { children: any }) => {
    const [isSettingsOpen, SetIsSettingsOpen] = useState<boolean>(false);
    const [theme, SetTheme] = useState<Themes>(Themes.Blur);

    useEffect(() => {
        //this loads saved themes is the user has changed the default theme
        const validThemes = Object.keys(Themes).filter(x => Number.isInteger(+x)).map(x => +x);
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme !== null && Number.isInteger(+storedTheme) && validThemes.includes(+storedTheme)) SetTheme((JSON.parse(storedTheme)) as Themes);
    }, [])

    const state: ISettingsContext = {
        isSettingsOpen: isSettingsOpen,
        SetIsSettingsOpen: useCallback((isSettingsOpen: boolean) => { SetIsSettingsOpen(isSettingsOpen)}, []),
        theme: theme,
        SetTheme: useCallback((theme: Themes) => {
            localStorage.setItem("theme", theme.toString())
            SetTheme(theme)
        }, [])
    }

    return (
        <SettingsContext.Provider value={state}>
            {props.children}
        </SettingsContext.Provider>
    );
}