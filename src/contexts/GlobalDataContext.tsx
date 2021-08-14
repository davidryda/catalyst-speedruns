import React, { createContext, useState, useCallback, useEffect } from "react";
import type ILevel from "../models/mirrorsedgecatalystapi/Level";

interface ISettingsContext {
    Levels: ILevel[] | null;
    SetLevels: (levels: ILevel[]) => void;
}

const GlobalDataContext = createContext<ISettingsContext>(null as any);
export default GlobalDataContext;

export const GlobalDataContextController = (props: { children: any }) => {
    const [levels, SetLevels] = useState<ILevel[] | null>(null);

    useEffect(() => {
    }, [])

    const state: ISettingsContext = {
        Levels: levels,
        SetLevels: useCallback((levels: ILevel[]) => { SetLevels(levels) }, []),
    }

    return (
        <GlobalDataContext.Provider value={state}>
            {props.children}
        </GlobalDataContext.Provider>
    );
}