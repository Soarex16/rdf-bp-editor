import React from 'react';
import {useTheme} from '../theme-context/theme-provider';

const ThemeSwitcher: React.FC = () => {
    const {toggleTheme} = useTheme();

    const handleThemeChange = React.useCallback(() => {
        console.log('theme change');
        toggleTheme();
    }, [toggleTheme]);

    return (
        <button onClick={handleThemeChange}>Toggle theme</button>
    );
};

export default ThemeSwitcher;