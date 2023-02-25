import { EColorTheme } from "./types";

export const AppBasePath = `/simple-login-app/`;

export function GetSavedTheme(): EColorTheme
{
    let savedTheme = localStorage.getItem('colorTheme');

    if (!savedTheme)
    {
        if (typeof window === `undefined` || typeof window.matchMedia === `undefined`)
        {
            return EColorTheme.Dark;
        }

        /** Use system color theme */
        const systemPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = systemPrefersDarkMode ? EColorTheme.Dark : EColorTheme.Light;
    }
    else
    {
        /** Validate saved color theme */
        savedTheme = savedTheme && savedTheme === EColorTheme.Light ? savedTheme : EColorTheme.Dark;
    }

    return savedTheme as EColorTheme;
}

export function SaveTheme(theme: EColorTheme): void
{
    localStorage.setItem('colorTheme', theme);
}

export function IsEmailValid(string: string): boolean
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(string);
}

/** 
 * @returns null if no error, otherwise returns the error string message
 */
export function getPasswordError(pwd: string): string | null
{
    const minPasswordLength = 8;
    const maxPasswordLength = 128;

    if (pwd.length < minPasswordLength)
    {
        return `Password must be at least ${minPasswordLength} characters long.`;
    }
    else if (pwd.length > maxPasswordLength)
    {
        return `Password must be at most ${maxPasswordLength} characters long.`;
    }

    return null;
}

/** 
 * @returns null if no error, otherwise returns the error string message
*/
export function getUsernameValidationError(username: string): string | null
{
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!usernameRegex.test(username))
    {
        return 'Username can only contain latin letters, numbers and underscores.';
    }

    const minUsernameLength = 3;
    const maxUsernameLength = 32;

    if (username.length < minUsernameLength)
    {
        return `Username must be at least ${minUsernameLength} characters long.`;
    }
    else if (username.length > maxUsernameLength)
    {
        return `Username must be at most ${maxUsernameLength} characters long.`;
    }

    return null;
}

export function fakeFetch(url: string, body: RequestInit, expectedMessage: string, timeoutMs: number): Promise<Record<string, unknown>>
{

    return new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            resolve({
                ok: false,
                error: expectedMessage
            });
        }, timeoutMs);
    });
}