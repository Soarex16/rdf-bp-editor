import React from 'react';

import classes from './Dropdown.module.scss';
import navClasses from '../nav-bar/NavigationBar.module.scss';

import {ReactComponent as IconChevronDown} from '../../../assets/icons/chevron-down.svg';
import clsx from 'clsx';

export interface DropdownProps {
    title: string;
}

export const Dropdown: React.FC<DropdownProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div className={classes.dropdown}>
            <button className={clsx(navClasses.navBar__navItem, classes.dropdown__title)}>
                {props.title} <IconChevronDown/>
            </button>

            <div className={classes.dropdown__content}>
                {props.children}
            </div>
        </div>
    );
};

export interface DropdownItemProps {
    title?: string;
}

export const DropdownItem: React.FC<DropdownItemProps & React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button onClick={props.onClick} className={classes.dropdown__item}>
            {props.children}
            <span className={classes.dropdown__itemTitle}>{props.title}</span>
        </button>
    )
};