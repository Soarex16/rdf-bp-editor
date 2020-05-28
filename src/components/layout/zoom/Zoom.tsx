import React from 'react';
import classes from './Zoom.module.scss';

import {ReactComponent as IconPlus} from '../../../assets/icons/plus.svg';
import {ReactComponent as IconReset} from '../../../assets/icons/zoom-fit.svg';
import {ReactComponent as IconMinus} from '../../../assets/icons/minus.svg';
import {ReactComponent as IconZoomToFit} from '../../../assets/icons/location.svg';

import EditorButton from '../editor-button/EditorButton';

import {useTranslation} from 'react-i18next';
import clsx from 'clsx';

export interface ZoomProps {
    onInc: React.MouseEventHandler<HTMLButtonElement>;
    onDec: React.MouseEventHandler<HTMLButtonElement>;
    onReset: React.MouseEventHandler<HTMLButtonElement>;
    onLocate?: React.MouseEventHandler<HTMLButtonElement>
}

const Zoom: React.FC<ZoomProps> = ({onInc, onDec, onReset, onLocate}) => {
    const [t, i18n] = useTranslation();

    return (
        <div className={classes.buttonContainer}>
            <div className={classes.zoomContainer}>
                <EditorButton onClick={onInc} className={classes.buttonInc} title={t('editor.buttons.zoom.in')}>
                    <IconPlus/>
                </EditorButton>

                <EditorButton onClick={onDec} className={classes.buttonDec} title={t('editor.buttons.zoom.out')}>
                    <IconMinus/>
                </EditorButton>
            </div>

            <EditorButton
                className={clsx(classes.buttonZoom, classes.buttonResetZoom)}
                onClick={onReset}
                title={t('editor.buttons.zoom.reset')}
            >
                <IconReset/>
            </EditorButton>

            {onLocate &&
            <EditorButton
                className={clsx(classes.buttonZoom, classes.buttonResetZoom)}
                onClick={onLocate}
                title={t('editor.buttons.zoom.locate')}
            >
                <IconZoomToFit/>
            </EditorButton>
            }
        </div>
    );
};

export default Zoom;