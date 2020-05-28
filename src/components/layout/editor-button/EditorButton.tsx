import React, {HTMLAttributes} from 'react';

import classes from './EditorButton.module.scss';
import clsx from 'clsx';

const EditorButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
    return (
        <button
            className={clsx(classes.editorButton, className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default EditorButton;