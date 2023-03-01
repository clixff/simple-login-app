import { Link } from "react-router-dom";
import styles from '../styles/modules/buttons.module.css';

interface ILoginButtonProps {
    large?: boolean;
}

export function LoginButton(props: ILoginButtonProps): JSX.Element {
    const classNames = [ styles['login'] ];
    if (props.large) {
        classNames.push(styles['large']);
    }

    return (<Link to="/login" className={classNames.join(' ')}>
            Sign in
    </Link>);
}