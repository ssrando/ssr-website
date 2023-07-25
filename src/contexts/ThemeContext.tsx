import { Theme, createTheme } from '@mui/material';
import React, { createContext, useMemo, useState } from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';

const LinkBehavior = React.forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
});

const storageKey = 'ssrwebTheme';

const allThemeElements = {
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
};

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    ...allThemeElements,
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    ...allThemeElements,
});

const getSavedTheme = (): Theme =>
    localStorage.getItem(storageKey) === 'light' ? lightTheme : darkTheme;

export const ThemeContext = createContext({
    theme: getSavedTheme(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleTheme: () => {},
});

export const ThemeContextProvider = (props: React.PropsWithChildren) => {
    const [theme, setTheme] = useState(getSavedTheme());
    const toggleTheme = () => {
        setTheme((currTheme) => {
            let newTheme: Theme;
            if (currTheme.palette.mode === 'light') {
                newTheme = darkTheme;
            } else {
                newTheme = lightTheme;
            }
            localStorage.setItem(storageKey, newTheme.palette.mode);
            return newTheme;
        });
    };
    const value = useMemo(() => ({ theme, toggleTheme }), [theme, setTheme]);
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    );
};
