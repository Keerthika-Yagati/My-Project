import { createContext, useState, useCallback, useEffect } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => {
        try {
            const saved = localStorage.getItem("theme");
            return saved ? JSON.parse(saved) : false;
        } catch {
            return false;
        }
    });

    const toggleTheme = useCallback(() => {
        setDark((prev) => !prev);
    }, []);

    // sync class on <html> and persist preference
    useEffect(() => {
        try {
            if (dark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("theme", JSON.stringify(dark));
        } catch (e) {
            // ignore
        }
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;