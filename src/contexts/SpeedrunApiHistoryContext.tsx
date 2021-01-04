import React, { useState, createContext, useCallback } from 'react';
import type IApiHistoryContext from '../models/contexts/ApiHistoryContext';
import type IStateData from '../models/contexts/StateData';

const SpeedrunApiHistoryContext = createContext<IApiHistoryContext>(null as any);
export default SpeedrunApiHistoryContext;

export const SpeedrunApiHistoryContextController = (props: {children: any}) => {
    const [fetchHistory, SetApiHistory] = useState<Map<string, IStateData>>(new Map<string, IStateData>());

    const state: IApiHistoryContext = {
        FetchHistory: fetchHistory,
        SetApiHistory: useCallback((fetchHistory: Map<string, IStateData>) => { SetApiHistory(fetchHistory); }, [])
    }

    return (
        <SpeedrunApiHistoryContext.Provider value={state}>
            {props.children}
        </SpeedrunApiHistoryContext.Provider>
    );
}