import React from 'react';
import styles from './Zoom.module.scss';

import plus from '../../../assets/icons/plus.svg';
import reset from '../../../assets/icons/zoom-fit.svg';
import minus from '../../../assets/icons/minus.svg';

export interface ZoomProps {
    onInc: React.MouseEventHandler<HTMLButtonElement>;
    onDec: React.MouseEventHandler<HTMLButtonElement>;
    onReset: React.MouseEventHandler<HTMLButtonElement>;
}

const Zoom: React.FC<ZoomProps> = ({onInc, onDec, onReset}) => {
    return (
        <div className={styles.buttonContainer}>
            <div className={styles.zoomContainer}>
                <button onClick={onInc} className={[styles.buttonZoom, styles.buttonInc].join(' ')}>
                    <img src={plus} className={styles.icon} width={18}/>
                </button>

                <button onClick={onDec} className={[styles.buttonZoom, styles.buttonDec].join(' ')}>
                    <img src={minus} className={styles.icon} width={18}/>
                </button>
            </div>

            <button
                className={[styles.buttonZoom, styles.buttonResetZoom].join(' ')}
                onClick={onReset}
            >
                <img src={reset} className={styles.icon}/>
            </button>
        </div>
    );
};

export default Zoom;