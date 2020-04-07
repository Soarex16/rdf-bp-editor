import React from 'react';
import styles from './Zoom.module.scss';

import {ReactComponent as IconPlus} from '../../../assets/icons/plus.svg';
import {ReactComponent as IconReset} from '../../../assets/icons/zoom-fit.svg';
import {ReactComponent as IconMinus} from '../../../assets/icons/minus.svg';

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
                    <IconPlus/>
                </button>

                <button onClick={onDec} className={[styles.buttonZoom, styles.buttonDec].join(' ')}>
                    <IconMinus/>
                </button>
            </div>

            <button
                className={[styles.buttonZoom, styles.buttonResetZoom].join(' ')}
                onClick={onReset}
            >
                <IconReset/>
            </button>
        </div>
    );
};

export default Zoom;