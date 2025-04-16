// src/hooks/useTheme.ts
import { useEffect, useState } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const stored = window.electron.electronStore.get('theme');
        if (stored) {
            setTheme(stored);
            applyTheme(stored);
        }
    }, []);

    const applyTheme = (newTheme: string) => {
        document.documentElement.classList.remove('theme-light', 'theme-dark');
        document.documentElement.classList.add(`theme-${newTheme}`);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        window.electron.electronStore.set('theme', newTheme);
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return { theme, toggleTheme };
}
