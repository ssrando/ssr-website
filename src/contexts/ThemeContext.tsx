import { Theme, createTheme } from '@mui/material';
import { createContext, useMemo, useState } from 'react';

const storageKey = 'ssrwebTheme';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
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
