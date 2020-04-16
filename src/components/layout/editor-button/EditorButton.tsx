import React, {HTMLAttributes} from 'react';

import classes from './EditorButton.module.scss';

const EditorButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
    return (
        <button
            className={`${classes.editorButton} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default EditorButton;