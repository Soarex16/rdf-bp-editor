import React, {HTMLAttributes} from 'react';

import classes from './LabelWidget.module.scss';

const LabelWidget: React.FC<HTMLAttributes<HTMLDivElement>> = ({className, children}) => {
    return (
        <div className={`${classes.label} ${className || ''}`}>
            {children}
        </div>
    );
};

export default LabelWidget;