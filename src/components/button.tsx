import { Link } from "react-router-dom";
import styles from '../styles/modules/buttons.module.css';
import { AppBasePath } from "../misc/misc";

interface ILoginButtonProps
{
    large?: boolean;
}

export function LoginButton(props: ILoginButtonProps): JSX.Element
{
    const classNames = [ styles['login'] ];
    if (props.large)
    {
        classNames.push(styles['large']);
    }

    return (<Link to={`${AppBasePath}login`} className={classNames.join(' ')}>
        <button tabIndex={-1}>
            Sign in
        </button>
    </Link>);
}