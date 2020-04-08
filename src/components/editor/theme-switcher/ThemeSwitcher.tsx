import React from 'react';
import {useTheme} from '../../layout/theme-context/theme-provider';
import styles from './ThemeSwitcher.module.scss';
import {ReactComponent as IconPlus} from '../../../assets/icons/palette.svg';

const ThemeSwitcher: React.FC = () => {
    const {toggleTheme} = useTheme();

    const handleThemeChange = React.useCallback(() => {
        console.log('theme change');
        toggleTheme();
    }, [toggleTheme]);

    return (
        <div className={styles.buttonContainer}>
            <button onClick={handleThemeChange} className={styles.buttonThemeSwitcher}>
                <IconPlus/>
            </button>
        </div>
    );
};

export default ThemeSwitcher;