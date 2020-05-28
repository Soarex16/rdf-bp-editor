import React, {useRef, useState} from 'react';
import {FormulaEditorLabelModel} from './FormulaEditorLabelModel';

import classes from './FormulaEditorLabelWidget.module.scss';
import LabelWidget from '../label/LabelWidget';
import {EditableMathField, MathField} from 'react-mathquill';
import {FormulaPaletteDropReceiver} from '../../layout/formula-palette/FormulaPalette';

export interface FlowAliasLabelWidgetProps {
    model: FormulaEditorLabelModel;
}

export const FormulaEditorLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const [str, setStr] = useState(props.model.formula);
    const changeVal = (val: string) => {
        props.model.formula = val;
        setStr(val);
    };

    const mqRef = useRef<null | MathField>(null);
    const insertDnDLatex = (latex: string) => {
        if (mqRef.current) {
            mqRef.current.write(latex);
        }
    };

    return (
        <LabelWidget className={classes.mqLabel}>
            <FormulaPaletteDropReceiver onDrop={insertDnDLatex}>
                <EditableMathField
                    latex={str}
                    mathquillDidMount={mathField => mqRef.current = mathField}
                    onChange={(mathField) => changeVal(mathField.latex())}
                />
            </FormulaPaletteDropReceiver>
        </LabelWidget>
    );
};
