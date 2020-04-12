import React, {useState} from 'react';
import {TextInputLabelModel} from './TextInputLabelModel';

import styles from './TextInputLabelWidget.module.scss';

export interface FlowAliasLabelWidgetProps {
    model: TextInputLabelModel;
}

export const TextInputLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const [str, setStr] = useState(props.model.value);

    return (
        <div className={styles.label}>
            <input
                size={str.length / 2}
                className={styles.label__input}
                type="text"
                value={str}
                onChange={event => {
                    const newVal = event.target.value;

                    setStr(newVal);
                    props.model.value = newVal;
                }}
            />
        </div>
    );
};
