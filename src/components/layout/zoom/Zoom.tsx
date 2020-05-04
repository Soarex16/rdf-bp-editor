import React from 'react';
import classes from './Zoom.module.scss';

import {ReactComponent as IconPlus} from '../../../assets/icons/plus.svg';
import {ReactComponent as IconReset} from '../../../assets/icons/zoom-fit.svg';
import {ReactComponent as IconMinus} from '../../../assets/icons/minus.svg';
import {ReactComponent as IconZoomToFit} from '../../../assets/icons/location.svg';

import EditorButton from '../editor-button/EditorButton';
import clsx from 'clsx';

export interface ZoomProps {
    onInc: React.MouseEventHandler<HTMLButtonElement>;
    onDec: React.MouseEventHandler<HTMLButtonElement>;
    onReset: React.MouseEventHandler<HTMLButtonElement>;
    onLocate?: React.MouseEventHandler<HTMLButtonElement>
}

const Zoom: React.FC<ZoomProps> = ({onInc, onDec, onReset, onLocate}) => {
    return (
        <div className={classes.buttonContainer}>
            <div className={classes.zoomContainer}>
                <EditorButton onClick={onInc} className={classes.buttonInc} title="Приблизить">
                    <IconPlus/>
                </EditorButton>

                <EditorButton onClick={onDec} className={classes.buttonDec} title="Отдалить">
                    <IconMinus/>
                </EditorButton>
            </div>

            <EditorButton
                className={clsx(classes.buttonZoom, classes.buttonResetZoom)}
                onClick={onReset}
                title="Сбросить масштаб"
            >
                <IconReset/>
            </EditorButton>

            {onLocate &&
            <EditorButton
                className={clsx(classes.buttonZoom, classes.buttonResetZoom)}
                onClick={onLocate}
                title="Найти диаграмму"
            >
                <IconZoomToFit/>
            </EditorButton>
            }
        </div>
    );
};

export default Zoom;