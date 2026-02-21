import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('geotarget-theme') || 'dark-blue');

    useEffect(() => {
        localStorage.setItem('geotarget-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);

        // Handle body background for consistency
        if (theme === 'white') {
            document.body.style.backgroundColor = '#ffffff';
        } else if (theme === 'half-white') {
            document.body.style.backgroundColor = '#f8fafc';
        } else {
            document.body.style.backgroundColor = '#0f172a';
        }
    }, [theme]);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
