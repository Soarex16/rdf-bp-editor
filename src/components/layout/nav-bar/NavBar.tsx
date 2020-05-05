import React from 'react';

import classes from './NavigationBar.module.scss';

import {ReactComponent as LogoIcon} from '../../../assets/icons/logo.svg';
import clsx from 'clsx';

const NavBar: React.FC = ({children}) => {
    return (
        <div
            className={clsx(classes.navBar, classes.navBar_position_top)}
        >
            {children}
        </div>
    );
};

export interface NavBarBrandProps {
    brand?: string;
}

export const NavBarBrand: React.FC<NavBarBrandProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    return (
        <a className={classes.navBar__brand} title={props.title} href={props.href}>
            <LogoIcon className={classes.navBar__brandIcon}/>

            {props.brand}
        </a>
    );
};

export const NavMenu: React.FC = (props) => {
    return (
        <nav className={classes.navBar__navMenu}>
            {props.children}
        </nav>
    );
};

export const NavMenuItem: React.FC = (props) => {
    return (
        <a className={classes.navBar__navItem} href="/">
            {props.children}
        </a>
    );
};

export default NavBar;
