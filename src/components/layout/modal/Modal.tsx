import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';
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
            className={styles.modal}
            onClick={hide}
        >
            <div
                className={styles.modal__card}
                onClick={e => e.stopPropagation()}
            >
                <button
                    className={styles.modal__buttonClose}
                    onClick={hide}
                >
                    <CloseIcon className={styles.modal__iconClose}/>
                </button>

                <div className={styles.modal__header}>
                    <span className={styles.modal__title}>
                        {title}
                    </span>
                </div>

                <div className={styles.modal__body}>
                    {children}
                </div>
            </div>
        </div>, document.documentElement
    ) : null;
};

export default Modal;