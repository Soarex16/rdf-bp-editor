import React from 'react';

import styles from './Menu.module.scss';

const Menu: React.FC = ({children}) => {
    return (
        <div
            className={styles.sideMenu}
        >
            {/*<a className={styles.sideMenuLogo}>
                <img src={logo}/>
            </a>*/}

            {children}
        </div>
    );
};

export default Menu;
