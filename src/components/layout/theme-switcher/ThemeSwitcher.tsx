import React from 'react';
import {useTheme} from '../theme-context/theme-provider';
import classes from './ThemeSwitcher.module.scss';
import {ReactComponent as IconPlus} from '../../../assets/icons/palette.svg';
import {useTranslation} from 'react-i18next';

const ThemeSwitcher: React.FC = () => {
    const {toggleTheme} = useTheme();

    const [t, i18n] = useTranslation();

    const handleThemeChange = React.useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    return (
        <div className={classes.buttonContainer}>
            <button onClick={handleThemeChange} className={classes.buttonThemeSwitcher}
                    title={t('editor.buttons.themeSwitcher')}>
                <IconPlus/>
            </button>
        </div>
    );
};

export default ThemeSwitcher;