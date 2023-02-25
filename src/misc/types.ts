import React from 'react';

export enum EColorTheme
{
    Light = 'light',
    Dark = 'dark'
}

export interface IAppContext
{
    colorTheme: EColorTheme;
    setColorTheme: (colorTheme: EColorTheme) => void;
}

export const AppContext = React.createContext<IAppContext>({
    colorTheme: EColorTheme.Light,
    setColorTheme: () => {
        // do nothing
    }
});