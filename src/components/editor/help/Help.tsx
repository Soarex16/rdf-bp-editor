import React from 'react';
import styles from './Help.module.scss';
import {ReactComponent as IconHelp} from '../../../assets/icons/help.svg';

const Help: React.FC = () => {
    return (
        <div className={styles.buttonContainer}>
            <button onClick={() => {console.log('help pressed')}} className={styles.buttonHelp}>
                <IconHelp/>
            </button>
        </div>
    );
};

export default Help;