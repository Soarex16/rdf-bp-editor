import React, {useState} from 'react';
import {FormulaEditorLabelModel} from './FormulaEditorLabelModel';

import styles from './FormulaEditorLabelWidget.module.scss';
import {MathFieldComponent} from 'react-mathlive';

export interface FlowAliasLabelWidgetProps {
    model: FormulaEditorLabelModel;
}

const autocompleteSuggestions = [
    // quantors
    '\\forall',
    '\\exists',
    '\\exists!',
    '\\nexists',

    // set definition
    '\\emptyset',

    // set relations
    '\\subset',
    '\\subsetneq',
    '\\subseteq',
    '\\supset',
    '\\supsetneq',
    '\\in',
    '\\ni',
    '\\notin',


    // set operations
    '\\cap',
    '\\cup',
    '\\setminus',
    '\\triangle',
    '\\times',

    // logical operations
    '\\land',
    '\\lor',
    '\\oplus',
    '\\lnot',
    '\\bar',
    '\\leftarrow',
    '\\rightarrow',
];

export const FormulaEditorLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const [str, setStr] = useState('\\forall');

    const changeVal = (val: string) => {
        props.model.formula = val;
        setStr(val);
    };

    return (
        <div className={styles.label}>
            <MathFieldComponent
                latex={str}
                onChange={changeVal}
            />
        </div>
    );
};
