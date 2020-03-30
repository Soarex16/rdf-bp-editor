import React, {useState} from 'react';
import {FormulaEditorLabelModel} from './FormulaEditorLabelModel';

import styles from './FormulaEditorLabelWidget.module.scss';
import {EditableMathField} from 'react-mathquill';

export interface FlowAliasLabelWidgetProps {
    model: FormulaEditorLabelModel;
}

export const FormulaEditorLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const [str, setStr] = useState(props.model.formula);

    return (
        <div className={styles.label}>
            <EditableMathField
                latex={str}
                onChange={(mathField) => {
                    props.model.formula = mathField.latex();
                    setStr(mathField.latex());
                }}
            />
        </div>
    );
};
