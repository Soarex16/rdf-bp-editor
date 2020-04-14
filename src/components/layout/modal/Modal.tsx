import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.scss';
import {ReactComponent as CloseIcon} from '../../../assets/icons/close.svg';

export interface ModalProps {
    title?: string;
    visible: boolean;
    hide: () => void;
}

const Modal: React.FC<ModalProps> = ({title, visible, hide, children, ...props}) => {
    return visible ? ReactDOM.createPortal(
        <div
            role="dialog"
            className={classes.modal}
            onClick={hide}
        >
            <div
                className={classes.modal__card}
                onClick={e => e.stopPropagation()}
            >
                <button
                    className={classes.modal__buttonClose}
                    onClick={hide}
                >
                    <CloseIcon className={classes.modal__iconClose}/>
                </button>

                <div className={classes.modal__header}>
                    <span className={classes.modal__title}>
                        {title}
                    </span>
                </div>

                <div className={classes.modal__body}>
                    {children}
                </div>
            </div>
        </div>, document.documentElement
    ) : null;
};

export default Modal;