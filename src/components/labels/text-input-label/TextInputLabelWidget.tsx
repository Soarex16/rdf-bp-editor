import React, {useState} from 'react';
import {TextInputLabelModel} from './TextInputLabelModel';

import classes from './TextInputLabelWidget.module.scss';
import LabelWidget from '../label/LabelWidget';

export interface FlowAliasLabelWidgetProps {
    model: TextInputLabelModel;
}

export const TextInputLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const [str, setStr] = useState(props.model.value);

    return (
        <LabelWidget>
            <input
                // https://qna.habr.com/q/222136
                // мне самому не нравится этот хак, но он
                // единственный дает приемлемые результаты
                // (на чистом css не вышло)
                style={{
                    width: (str.length + 1) * 8
                }}
                className={classes.label__input}
                type="text"
                value={str}
                onChange={event => {
                    const newVal = event.target.value;

                    setStr(newVal);
                    props.model.value = newVal;
                }}
            />
        </LabelWidget>
    );
};
