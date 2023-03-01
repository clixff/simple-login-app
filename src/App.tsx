import React from 'react';
import { EColorTheme, AppContext } from './misc/types';
import { GetSavedTheme } from './misc/misc';
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/navbar';
import { SaveTheme } from './misc/misc';
import styles from './styles/modules/app.module.css';

type AppProps = Record<string, unknown>;

interface IAppState {
    theme: EColorTheme;
}

export default class App extends React.Component<AppProps, IAppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            theme: GetSavedTheme()
        };

        this.setTheme = this.setTheme.bind(this);
        this.onThemeChanged = this.onThemeChanged.bind(this);
        this.onSystemThemeChangedToDark = this.onSystemThemeChangedToDark.bind(this);
    }

    componentDidMount(): void  {
        this.onThemeChanged();

        if (typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined') {
            /** Detects system theme change */
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.onSystemThemeChangedToDark);
        }
    }

    componentWillUnmount(): void {
        if (typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined') {
            /** Removes system theme change listener */
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.onSystemThemeChangedToDark);
        }
    }

    setTheme(newTheme: EColorTheme) {
        this.setState({
            theme: newTheme
        }, () => {
            SaveTheme(newTheme);
            this.onThemeChanged();
        });
    }

    onSystemThemeChangedToDark(data: MediaQueryListEvent): void {
        if (!data || typeof data !== 'object' || typeof data.matches !== 'boolean') {
            return;
        }

        const oldTheme = this.state.theme;
        const newTheme = data.matches ? EColorTheme.Dark : EColorTheme.Light;

        if (oldTheme !== newTheme) {
            this.setTheme(newTheme);
        }
    }

    onThemeChanged() {
        document.documentElement.setAttribute('color-theme', `${this.state.theme}`)
    }

    render() {
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