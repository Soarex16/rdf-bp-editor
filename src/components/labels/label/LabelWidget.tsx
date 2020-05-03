import React, {HTMLAttributes} from 'react';

import classes from './LabelWidget.module.scss';
import clsx from 'clsx';

const LabelWidget: React.FC<HTMLAttributes<HTMLDivElement>> = ({className, children}) => {
    return (
        <div className={clsx(classes.label, className)}>
            {children}
        </div>
    );
};

export default LabelWidget;