import React, { useState } from 'react';
import styles from '../styles/modules/pages/login.module.css';
import { IsEmailValid, fakeFetch, getPasswordError, getUsernameValidationError } from '../misc/misc';

interface ILoginMessageProps
{
    message: string;
}

function LoginErrorMessage(props: ILoginMessageProps): JSX.Element
{
    return (<div className={styles['login-error']}>
        {props.message}
    </div>);
}

interface IFormGroupProps
{
    label: string;
    type: React.HTMLInputTypeAttribute;
    id: string;
    placeholder?: string;
    autoFocus?: boolean;
    error?: string;
}

/** Uncontrolled form group component */
function FormGroup(props: IFormGroupProps): JSX.Element
{
    const error = props.error;

    const placeholder = props.placeholder || '';
    const autofocus = props.autoFocus || false;

    return (<fieldset className={[styles['form-group'], error ? styles['form-error'] : ''].join(' ')}>

        <label htmlFor={props.id}>{props.label}</label>
        
        <input type={props.type} id={props.id} name={props.id} placeholder={placeholder} autoFocus={autofocus} autoComplete='off' />

        {
            error && <span className={styles['error']}>{error}</span>
        }
    </fieldset>);
}

interface ILoginComponentProps
{
    onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errorsData: Record<string, string>;
    buttonDisabled: boolean;
}

function SignInComponent(props: ILoginComponentProps): JSX.Element
{
    return (<div className={[styles['login-component'], styles['sign-in']].join(' ')}>
        <h3>
            Sign in
        </h3>
        <form className={styles['form']} onSubmit={props.onFormSubmit} noValidate={true} autoComplete={'off'}>
            <FormGroup label="Email" type="email" id="email" autoFocus={true} error={props.errorsData['email']}  />
            <FormGroup label="Password" type="password" id="password" error={props.errorsData['password']}  />
            <button className={styles['submit']} type="submit" disabled={props.buttonDisabled}>Sign in</button>
        </form>
    </div>);
}

function SignUpComponent(props: ILoginComponentProps): JSX.Element
{
    return (<div className={[styles['login-component'], styles['sign-up']].join(' ')}>
        <h3>
            Sign up
        </h3>
        <form className={styles['form']} onSubmit={props.onFormSubmit} noValidate={true} autoComplete={'off'} >
            <FormGroup label="Username" type="text" id="username" autoFocus={true} error={props.errorsData['username']}  />
            <FormGroup label="Email" type="email" id="email" error={props.errorsData['email']}  />
            <FormGroup label="Password" type="password" id="password" error={props.errorsData['password']}  />
            <button className={styles['submit']} type="submit" disabled={props.buttonDisabled}>Sign up</button>
        </form>
    </div>);
}

/** Data we store in the component state */
interface IServerResponseState
{
    success: boolean;
    message: string;
    loading: boolean;
}

/** Data we get from server */
interface IServerResponseData
{
    ok: boolean;
    error?: string;
}

function LoginCard()
{
    const [serverResponse, setServerResponse] = useState<IServerResponseState>({ success: false, message: '', loading: false });
    const [isSignUp, setIsSignUp] = useState(false);
    /** Stores error strings for fields */
    const [errorsData, setErrors] = useState<Record<string, string>>({});

    const onChangeModeClick = () => 
    {
        if (serverResponse.loading)
        {
            return;
        }

        /** Clear errors */
        setErrors({});
        /** Toggle sign mode */
        setIsSignUp(!isSignUp);
        /** Clear server response message */
        setServerResponse({ success: false, message: '', loading: false });
    }

    async function sendLoginRequest(formData: FormData): Promise<void>
    {
        try
        {
            const URL = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
            const expectedMessage = !isSignUp ? 'Incorrect email or password' : 'An unexpected error occurred';

            /** Set loading state */
            setServerResponse({ success: false, message: '', loading: true });

            /** Data we get from the fake fetch is already parsed */
            const response = await fakeFetch(URL, {
                method: 'POST',
                body: formData
            }, expectedMessage, 2000) as unknown as IServerResponseData;

            if (!response || typeof response !== 'object' || typeof response['ok'] !== 'boolean')
            {
                throw new Error('No response from server');
            }

            /** Update error message after server response, and disable loading state */
            setServerResponse({
                loading: false,
                success: response.ok || false,
                message: response.error || ''
            });
        }
        catch (error)
        {
            console.error(error);
            setServerResponse({
                loading: false,
                success: false,
                message: ''
            });
        }
    }
    
    function onLoginFormSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        /** Already sent a request and waiting for response */
        if (serverResponse.loading)
        {
            return;
        }

        const formItems = event.currentTarget.elements;

        /** Validate input data and set errors */

        const emailElement = formItems.namedItem('email') as HTMLInputElement;
        const passwordElement = formItems.namedItem('password') as HTMLInputElement;

        if (!emailElement || !passwordElement)
        {
            return;
        }

        const email = emailElement.value;
        const password = passwordElement.value;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const errors: Record<string, string> = {};

        if (!IsEmailValid(email))
        {
            errors['email'] = 'Email is invalid.';
        }

        const pwdError = getPasswordError(password);
        if (pwdError)
        {
            errors['password'] = pwdError;
        }

        /** Validate username input for sign-up */
        if (isSignUp)
        {
            const usernameElement = formItems.namedItem('username') as HTMLInputElement;
            if (!usernameElement)
            {
                return;
            }

            const username = usernameElement.value;

            formData.append('username', usernameElement.value);

            const usernameError = getUsernameValidationError(username);
            if (usernameError)
            {
                errors['username'] = usernameError;
            }
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0)
        {
            return;
        }

        sendLoginRequest(formData);
    }

    const loginComponentProps: ILoginComponentProps = {
        onFormSubmit: onLoginFormSubmit,
        errorsData: errorsData,
        buttonDisabled: serverResponse.loading
    };

    const LoginComponent: React.FC<ILoginComponentProps> = isSignUp ? SignUpComponent : SignInComponent;

    const changeModeText = isSignUp ? 'Already have an account?' : 'Don\'t have an account?';
    const changeModeButtonText = isSignUp ? 'Sign in' : 'Sign up';

    const shouldShowServerMessage = serverResponse.loading == false && serverResponse.success == false && !!serverResponse.message.length;

    return (<div id={styles['card']}>
        {
            shouldShowServerMessage ? 
            (
                <LoginErrorMessage message={serverResponse.message} />
            ) : null
        }
        <LoginComponent {...loginComponentProps} />
        <div id={styles['card-change-mode']}>
            <span> { changeModeText } </span>
            <button onClick={onChangeModeClick}> { changeModeButtonText } </button>
        </div>
    </div>);
}

export default function LoginPage(): JSX.Element
{
    return (<div id={styles['wrapper']}>
        <LoginCard />
    </div>);
}