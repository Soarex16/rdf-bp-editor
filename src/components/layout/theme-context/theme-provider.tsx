import React from 'react';

export interface ThemeContextProps {
    currentTheme: string;
    // toggle by round robin or select
    toggleTheme: (theme?: string) => void;

    availableThemes: string[];
    addTheme: (theme: string) => void;
    removeTheme: (theme: string) => void;
}

interface ThemeProviderProps {
    themes?: string[];
}

// save theme data to local storage
const localStorageThemeKey = '__theme';

const defaultContextValue: ThemeContextProps = {
    currentTheme: '',
    toggleTheme: () => {
    },

    availableThemes: [],
    addTheme: theme => {
    },
    removeTheme: theme => {
    }
};

const ThemeContext = React.createContext<ThemeContextProps>(defaultContextValue);

const ThemeProvider: React.FC<ThemeProviderProps> = ({themes, ...props}) => {
    const [currentTheme, setCurrentTheme] = React.useState(
        localStorage.getItem(localStorageThemeKey) || defaultContextValue.currentTheme
    );

    const [availableThemes, setAvailableThemes] = React.useState<string[]>(themes);

    const toggleTheme = (theme?: string) => {
        let nextTheme;

        if (theme) {
            if (availableThemes.includes(theme)) {
                nextTheme = theme;
            } else {
                nextTheme = currentTheme;
            }
        } else {
            // if no theme passed into the function - just round robin
            nextTheme = availableThemes[(availableThemes.indexOf(currentTheme) + 1) % availableThemes.length];
        }

        // no need to go into the synchronous API without reason
        if (currentTheme !== nextTheme) {
            localStorage.setItem(localStorageThemeKey, nextTheme);
            setCurrentTheme(nextTheme);
        }
    };

    const addTheme = (theme: string) => {
        if (availableThemes.includes(theme))
            return;

        setAvailableThemes([...availableThemes, theme]);
    };

    const removeTheme = (theme: string) => {
        const themeIdx = availableThemes.indexOf(theme);

        if (themeIdx === -1)
            return;

        if (theme === currentTheme)
            toggleTheme();

        setAvailableThemes(availableThemes.filter((_, idx) => idx !== themeIdx));
    };

    return (
        // a little bit hacky, but I prefer this implementation, because it fully relies on css variables
        // maybe set style globally in html or body tag??
        <div className={currentTheme}>
            <ThemeContext.Provider value={{
                currentTheme: currentTheme,
                toggleTheme,

                availableThemes,
                addTheme,
                removeTheme
            }}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    );
};

// provide various ways to use theme context

const useTheme = () => React.useContext<ThemeContextProps>(ThemeContext);

const withTheme = <PropTypes extends {}>(Component: React.ComponentType<PropTypes>) => (props: PropTypes) => (
    <ThemeContext.Consumer>
        {(themeProps) => <Component {...props} {...themeProps} />}
    </ThemeContext.Consumer>
);

export {ThemeProvider, useTheme, withTheme};
