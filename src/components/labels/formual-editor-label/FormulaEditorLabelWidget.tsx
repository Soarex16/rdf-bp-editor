import React, {useState} from 'react';
import {FormulaEditorLabelModel} from './FormulaEditorLabelModel';

import classes from './FormulaEditorLabelWidget.module.scss';
import LatexAutocompleteInput from '../../layout/latex-autocomplete-input/LatexAutocompleteInput';

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
    '\\subseteq',
    '\\supset',
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
    const [str, setStr] = useState(props.model.formula);

    const changeVal = (val: string) => {
        props.model.formula = val;
        setStr(val);
    };

    return (
        <div className={classes.label}>
            {/*А не приведет ли это к бесконечному циклу?*/}
            <LatexAutocompleteInput
                suggestions={autocompleteSuggestions}
                onChange={changeVal}
                value={str}
            />
        </div>
    );
};
