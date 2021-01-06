import React, { createContext, useState, useCallback } from "react";

interface ISettingsContext {
    isSettingsOpen: boolean;
    SetIsSettingsOpen: (isSettingsOpen: boolean) => void;
}

const SettingsContext = createContext<ISettingsContext>(null as any);
export default SettingsContext;

export const SettingsContextController = (props: { children: any }) => {
    const [isSettingsOpen, SetIsSettingsOpen] = useState<boolean>(false);

    const state: ISettingsContext = {
        isSettingsOpen: isSettingsOpen,
        SetIsSettingsOpen: useCallback((isSettingsOpen: boolean) => {
            SetIsSettingsOpen(isSettingsOpen);
        }, [])
    }

    return (
        <SettingsContext.Provider value={state}>
            {props.children}
        </SettingsContext.Provider>
    );
}