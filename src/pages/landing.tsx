import { LoginButton } from '../components/button';
import styles from '../styles/modules/pages/landing.module.css';

export default function LandingPage(): JSX.Element {
    return (<div id={styles['wrapper']}>
        <div id={styles['content']}>
            <div id={styles['info']}>
                <h1 id={styles['title']}>
                    Simple App
                </h1>
                <h2 id={styles['desc']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </h2>
            </div>
            <div id={styles['login-wrapper']}>
                <LoginButton large={true} />
            </div>
        </div>
        <div id={styles['gradient']} />
    </div>);
}