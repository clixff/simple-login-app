import React, { useContext } from 'react';
import styles from '../styles/modules/navbar.module.css';
import { Link } from 'react-router-dom';
import { LoginButton } from './button';
import { AppContext, EColorTheme } from '../misc/types';
import { MoonIcon } from './icons';

function Logo(): JSX.Element {
    return (<Link to="/" id={styles['logo']}>
        Simple App
    </Link>);
}

function ColorThemeButton() {
    const appContext = useContext(AppContext);

    /** Toggle color theme */
    function onClick() {
        if (appContext && typeof appContext.setColorTheme === 'function') {
            const newTheme = appContext.colorTheme === EColorTheme.Light ? EColorTheme.Dark : EColorTheme.Light;
            appContext.setColorTheme(newTheme);
        }
    }

    return (<button className={styles['color-theme-btn']} onClick={onClick}>
        <MoonIcon />
    </button>);
}

export function NavBar(): JSX.Element {

    return (<div id={styles['wrapper']}> 
        <div id={styles['content']}>
            <div id={styles['content-left']}>
                <Logo />
                <ColorThemeButton />
            </div>
            <LoginButton />
        </div>
    </div>);
}