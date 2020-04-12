import React from 'react';

import styles from './NavigationBar.module.scss';

import {ReactComponent as LogoIcon} from '../../../assets/icons/logo.svg';

//TODO: DRY - вынести лишние сущности в отдельные классы

const NavBar: React.FC = ({children}) => {
    return (
        <div
            className={`${styles.navBar} ${styles.navBar_position_top}`}
        >
            {children}
        </div>
    );
};

export interface NavBarBrandProps {
    title?: string;
}

export const NavBarBrand: React.FC<NavBarBrandProps> = ({title}) => {
    return (
        <a className={styles.navBar__brand}>
            <LogoIcon className={styles.navBar__brandIcon}/>

            {title}
        </a>
    );
};

export const NavMenu: React.FC = (props) => {
    return (
        <nav className={styles.navBar__navMenu}>
            {props.children}
        </nav>
    );
};

export const NavMenuItem: React.FC = (props) => {
    return (
        <a className={styles.navBar__navItem}>
            {props.children}
        </a>
    );
};

export default NavBar;
