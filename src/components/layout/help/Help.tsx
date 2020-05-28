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
import {useTranslation} from 'react-i18next';

const Help: React.FC = () => {
    const [helpVisible, setHelpVisible] = React.useState<boolean>(false);

    const toggleHelp = React.useCallback(() => setHelpVisible(!helpVisible), [helpVisible]);

    const [t, i18n] = useTranslation();

    return (
        <>
            <Modal visible={helpVisible} hide={toggleHelp} title={t('editor.help.title')}>
                <div>
                    <HelpWindow/>
                </div>
            </Modal>

            <div className={classes.buttonContainer}>
                <button onClick={toggleHelp} className={classes.buttonHelp} title={t('editor.help.title')}>
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

    KeyA = 'a',

    Mouse = 'mouse',
    MouseRight = 'mouse-right',
    MouseLeftDbl = 'mouse-left-dbl',
    MouseRightDbl = 'mouse-right-dbl',
    MouseLeft = 'mouse-left',
    MouseMiddle = 'mouse-middle',
    MouseScroll = 'mouse-scroll',
}

interface KeyboardButtonIconProps {
    text: string;
}

const KeyboardButtonIcon: React.FC<KeyboardButtonIconProps> = ({text}) => {
    const maskId = `text-cutoff-${text}`;

    return (
        <svg viewBox="0 0 30 30" className={classes.keyboardIcon}>
            <defs>
                <mask id={maskId}>
                    <rect x={4} y={4} width={22} height={22} rx={2} ry={2} fill="white"/>
                    <text x={16} y={20} fill="#000">{text.substring(0, 1)}</text>
                </mask>
            </defs>

            <rect width="100%" height="100%" mask={`url(#${maskId})`}/>
        </svg>
    );
};

const buttonHelpComponents: { [action: string]: { icon: ReactElement, actionName: string } } = {
    [InputActionTypes.MouseMiddle]: {
        icon: <IconMouse/>,
        actionName: 'editor.help.actionNames.mouseMiddle'
    },
    [InputActionTypes.MouseScroll]: {
        icon: <IconMouseScroll/>,
        actionName: 'editor.help.actionNames.mouseScroll'
    },
    [InputActionTypes.MouseLeft]: {
        icon: <IconMouseLeft/>,
        actionName: 'editor.help.actionNames.mouseLeft'
    },
    [InputActionTypes.MouseRight]: {
        icon: <IconMouseRight/>,
        actionName: 'editor.help.actionNames.mouseRight'
    }, [InputActionTypes.MouseLeftDbl]: {
        icon: <IconMouseLeft/>,
        actionName: 'editor.help.actionNames.mouseLeftDbl'
    }, [InputActionTypes.MouseRightDbl]: {
        icon: <IconMouseRight/>,
        actionName: 'editor.help.actionNames.mouseRightDbl'
    },
    [InputActionTypes.Mouse]: {
        icon: <IconMouse/>,
        actionName: 'editor.help.actionNames.mouse'
    },
    [InputActionTypes.KeyShift]: {
        icon: <IconKeyShift/>,
        actionName: 'editor.help.actionNames.keyShift'
    },
    [InputActionTypes.KeyCtrl]: {
        icon: <IconKeyCtrl/>,
        actionName: 'editor.help.actionNames.keyCtrl'
    },
    [InputActionTypes.KeyDel]: {
        icon: <IconKeyDel/>,
        actionName: 'editor.help.actionNames.keyDel'
    },
    [InputActionTypes.KeyA]: {
        icon: <KeyboardButtonIcon text={'a'}/>,
        actionName: 'editor.help.actionNames.keyA'
    }
};

const helpData = [
    {
        keys: [InputActionTypes.MouseMiddle, InputActionTypes.MouseScroll],
        description: 'editor.help.shortcuts.moveCanvas'
    },
    {
        keys: [InputActionTypes.MouseScroll],
        description: 'editor.help.shortcuts.zoom'
    },
    {
        keys: [InputActionTypes.KeyShift, InputActionTypes.MouseRight],
        description: 'editor.help.shortcuts.select'
    },
    {
        keys: [InputActionTypes.KeyShift, InputActionTypes.KeyCtrl, InputActionTypes.KeyA],
        description: 'editor.help.shortcuts.selectAll'
    },
    {
        keys: [InputActionTypes.KeyDel],
        description: 'editor.help.shortcuts.deleteSelected'
    },
    {
        keys: [InputActionTypes.MouseLeftDbl],
        description: 'editor.help.shortcuts.expandNode'
    }
];

const HelpWindow: React.FC = () => {
    const [t, i18n] = useTranslation();

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
                                        className={classes.help__actionName}
                                    >
                                        {t(buttonHelpComponents[key].actionName)}
                                    </span>
                                </div>
                                {idx < helpEntry.keys.length - 1 && '+'}
                            </>
                        ))}
                    </div>

                    <div className={classes.help__shortcutDescription}>
                        {t(helpEntry.description)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Help;