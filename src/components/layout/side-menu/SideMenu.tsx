import React from 'react';

import styles from './SideMenu.module.scss';

import logo from '../../../assets/icons/logo.svg';

/*соответствующая кнопка переключает класс у панельки (hidden или показывается)*/
const SideMenu: React.FC = () => {
    return (
        <div className={styles.sideMenu}>
            <a className={styles.sideMenuLogo}>
                <img src={logo}/>
            </a>

            <SideMenuButton>
                <svg className={styles.icon}>
                    <rect width={30} height={30}></rect>
                </svg>
            </SideMenuButton>

            <SideMenuButton>
                <svg className={styles.icon}>
                    <rect width={30} height={30}></rect>
                </svg>
            </SideMenuButton>

            <SideMenuButton>
                <svg className={styles.icon}>
                    <rect width={30} height={30}></rect>
                </svg>
            </SideMenuButton>

            <SideMenuButton>
                <svg className={styles.icon}>
                    <circle cx={15} cy={15} r={15}></circle>
                </svg>
            </SideMenuButton>
        </div>
    );
};

const SideMenuButton: React.FC = ({children}) => (
    <button className={styles.sideMenuButton}>
        {children}
    </button>
);

export default SideMenu;
