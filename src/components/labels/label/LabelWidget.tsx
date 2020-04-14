import React from 'react';

import classes from './LabelWidget.module.scss';

const LabelWidget: React.FC = ({children}) => {
    return (
        <div className={classes.label}>
            {children}
        </div>
    );
};

export default LabelWidget;