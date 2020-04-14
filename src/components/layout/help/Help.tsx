import React from 'react';

import Modal from '../modal/Modal';

import {ReactComponent as IconHelp} from '../../../assets/icons/help.svg';
import classes from './Help.module.scss';

const Help: React.FC = () => {
    const [helpVisible, setHelpVisible] = React.useState<boolean>(false);

    const toggleHelp = React.useCallback(() => setHelpVisible(!helpVisible), [helpVisible]);

    const [innerModal, setInnerOpened] = React.useState<boolean>(false);
    return (
        <>
            <Modal visible={helpVisible} hide={toggleHelp}>
                <div>
                    Some help text!

                    <button onClick={() => setInnerOpened(!innerModal)}>Open inner modal</button>

                    <Modal visible={innerModal} hide={() => setInnerOpened(!innerModal)}>
                        I am inner modal
                    </Modal>
                </div>
            </Modal>
            <div className={classes.buttonContainer}>
                <button onClick={toggleHelp} className={classes.buttonHelp}>
                    <IconHelp/>
                </button>
            </div>
        </>
    );
};

export default Help;