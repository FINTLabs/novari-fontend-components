import { useEffect, useState } from 'react';
import { ThemeProviderContext } from './themeContext';
import type { Theme } from './themeContext';

export type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

export function ThemeProvider({
    children,
    defaultTheme = 'light',
    storageKey = 'novari-theme',
    ...props
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') return defaultTheme;
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setThemeState(newTheme);
    };

    const value = { theme, setTheme };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
