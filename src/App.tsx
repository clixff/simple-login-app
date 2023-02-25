import React from 'react'
import { EColorTheme, AppContext } from './misc/types'
import { GetSavedTheme } from './misc/misc';
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/navbar';
import styles from './styles/modules/app.module.css'
import { SaveTheme } from './misc/misc';


type AppProps = Record<string, unknown>;

interface IAppState
{
    theme: EColorTheme;
}

export default class App extends React.Component<AppProps, IAppState>
{
    constructor(props: AppProps)
    {
        super(props);
        this.state = {
            theme: GetSavedTheme()
        };

        this.setTheme = this.setTheme.bind(this);
        this.onThemeChanged = this.onThemeChanged.bind(this);
    }

    componentDidMount(): void 
    {
        this.onThemeChanged();
    }

    setTheme(newTheme: EColorTheme)
    {
        this.setState({
            theme: newTheme
        }, () =>
        {
            SaveTheme(newTheme);
            this.onThemeChanged();
        });
    }

    onThemeChanged()
    {
        document.documentElement.setAttribute('color-theme', `${this.state.theme}`)
    }

    render()
    {
        return (
            <AppContext.Provider value={{
                colorTheme: this.state.theme,
                setColorTheme: this.setTheme
            }}>
                <div id={styles['wrapper']}>
                    <NavBar />
                    <div id={styles['content']}>
                        <Outlet />
                    </div>
                </div>
            </AppContext.Provider>
        )
    }
}