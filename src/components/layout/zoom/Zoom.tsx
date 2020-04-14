import React from 'react';
import classes from './Zoom.module.scss';

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
        <div className={classes.buttonContainer}>
            <div className={classes.zoomContainer}>
                <button onClick={onInc} className={[classes.buttonZoom, classes.buttonInc].join(' ')}>
                    <IconPlus/>
                </button>

                <button onClick={onDec} className={[classes.buttonZoom, classes.buttonDec].join(' ')}>
                    <IconMinus/>
                </button>
            </div>

            <button
                className={[classes.buttonZoom, classes.buttonResetZoom].join(' ')}
                onClick={onReset}
            >
                <IconReset/>
            </button>
        </div>
    );
};

export default Zoom;