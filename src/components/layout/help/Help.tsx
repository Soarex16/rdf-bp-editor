import React, {ReactElement} from 'react';

import Modal from '../modal/Modal';

import {ReactComponent as IconKeyShift} from '../../../assets/icons/keys/shift.svg';
import {ReactComponent as IconKeyCtrl} from '../../../assets/icons/keys/ctrl.svg';
import {ReactComponent as IconKeyDel} from '../../../assets/icons/keys/del.svg';
import {ReactComponent as IconMouse} from '../../../assets/icons/keys/mouse.svg';
import {ReactComponent as IconMouseScroll} from '../../../assets/icons/keys/mouse-scroll.svg';
import {ReactComponent as IconMouseLeft} from '../../../assets/icons/keys/mouse-left.svg';
import {ReactComponent as IconMouseRight} from '../../../assets/icons/keys/mouse-right.svg';

import {ReactComponent as IconHelp} from '../../../assets/icons/help.svg';
import classes from './Help.module.scss';

const Help: React.FC = () => {
    const [helpVisible, setHelpVisible] = React.useState<boolean>(false);

    const toggleHelp = React.useCallback(() => setHelpVisible(!helpVisible), [helpVisible]);

    const [innerModal, setInnerOpened] = React.useState<boolean>(false);
    return (
        <>
            <Modal visible={helpVisible} hide={toggleHelp} title={'Подсказки навигации'}>
                <div>
                    <HelpWindow/>
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

enum InputActionTypes {
    KeyShift = 'shift',
    KeyCtrl = 'ctrl',
    KeyDel = 'del',
    Mouse = 'mouse',
    MouseRight = 'mouse-right',
    MouseLeftDbl = 'mouse-left-dbl',
    MouseRightDbl = 'mouse-right-dbl',
    MouseLeft = 'mouse-left',
    MouseMiddle = 'mouse-middle',
    MouseScroll = 'mouse-scroll'
}

const buttonHelpComponents: { [action: string]: { icon: ReactElement, actionName: string } } = {
    [InputActionTypes.MouseMiddle]: {
        icon: <IconMouse/>,
        actionName: 'средняя клавиша'
    },
    [InputActionTypes.MouseScroll]: {
        icon: <IconMouseScroll/>,
        actionName: 'скролл'
    },
    [InputActionTypes.MouseLeft]: {
        icon: <IconMouseLeft/>,
        actionName: 'левая кнопка'
    },
    [InputActionTypes.MouseRight]: {
        icon: <IconMouseRight/>,
        actionName: 'правая кнопка'
    }, [InputActionTypes.MouseLeftDbl]: {
        icon: <IconMouseLeft/>,
        actionName: 'левая кнопка x2'
    }, [InputActionTypes.MouseRightDbl]: {
        icon: <IconMouseRight/>,
        actionName: 'правая кнопка x2'
    },
    [InputActionTypes.Mouse]: {
        icon: <IconMouse/>,
        actionName: 'мышь'
    },
    [InputActionTypes.KeyShift]: {
        icon: <IconKeyShift/>,
        actionName: 'shift'
    },
    [InputActionTypes.KeyCtrl]: {
        icon: <IconKeyCtrl/>,
        actionName: 'ctrl'
    },
    [InputActionTypes.KeyDel]: {
        icon: <IconKeyDel/>,
        actionName: 'del'
    },
};

const helpData = [
    {
        keys: [InputActionTypes.MouseMiddle, InputActionTypes.MouseScroll],
        description: 'переместить полотно'
    },
    {
        keys: [InputActionTypes.MouseScroll],
        description: 'приблизить/отдалить'
    },
    {
        keys: [InputActionTypes.KeyShift, InputActionTypes.MouseRight],
        description: 'выделить ноды'
    },
    {
        keys: [InputActionTypes.KeyDel],
        description: 'удалить выделенные объекты'
    },
    {
        keys: [InputActionTypes.MouseLeftDbl],
        description: 'развернуть ноду'
    }
];

const HelpWindow: React.FC = (props) => {

    return (
        <div>
            {helpData.map(helpEntry => (
                <div className={classes.help__helpEntry}>
                    <div className={classes.help__actionShortcut}>
                        {helpEntry.keys.map((key, idx) => (
                            <>
                                <div className={classes.help__action}>
                                    {buttonHelpComponents[key].icon}

                                    <span
                                        className={classes.help__actionName}>{buttonHelpComponents[key].actionName}</span>
                                </div>
                                {idx < helpEntry.keys.length - 1 && '+'}
                            </>
                        ))}
                    </div>

                    <div className={classes.help__shortcutDescription}>
                        {helpEntry.description}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Help;