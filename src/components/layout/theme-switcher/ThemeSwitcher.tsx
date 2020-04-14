import React from 'react';
import {useTheme} from '../theme-context/theme-provider';
import classes from './ThemeSwitcher.module.scss';
import {ReactComponent as IconPlus} from '../../../assets/icons/palette.svg';

const ThemeSwitcher: React.FC = () => {
    const {toggleTheme} = useTheme();

    const handleThemeChange = React.useCallback(() => {
        console.log('theme change');
        toggleTheme();
    }, [toggleTheme]);

    return (
        <div className={classes.buttonContainer}>
            <button onClick={handleThemeChange} className={classes.buttonThemeSwitcher}>
                <IconPlus/>
            </button>
        </div>
    );
};

export default ThemeSwitcher;