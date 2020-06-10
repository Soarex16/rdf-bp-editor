import React from 'react';
import {StaticMathField} from 'react-mathquill';

import classes from './FormulaPalette.module.scss';

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
    '\\neg',
    //'\\bar',
    '\\leftarrow',
    '\\rightarrow',

    // additional
    '\\prec',
    '\\succ',
    '\\odot',
    '\\oplus',
    '\\ominus',
    '\\otimes',
];

interface FormulaPaletteItemProps {
    latex: string;
    tooltip?: string;
}

const dataTransferKey: string = 'latex-palette';

export const FormulaPaletteItem: React.FC<FormulaPaletteItemProps> = ({latex, tooltip}) => {
    return (
        <div
            title={tooltip}
            draggable={true}
            onDragStart={event => {
                event.dataTransfer.setData(dataTransferKey, latex);
            }}
            className={classes.palette__item}
        >
            <div className={classes.palette__paletteItemOverlap}/>
            <StaticMathField>{latex}</StaticMathField>
        </div>
    );
};

export const FormulaPalette: React.FC = () => {
    return (
        <div className={classes.palette}>
            {autocompleteSuggestions.map(latex => (
                <FormulaPaletteItem latex={latex}/>
            ))}
        </div>
    );
};

interface FormulaPaletteDropReceiverProps {
    onDrop: (latex: string) => void;
}

export const FormulaPaletteDropReceiver: React.FC<FormulaPaletteDropReceiverProps> = (props) => {
    return (
        <div
            onDrop={event => {
                props.onDrop(event.dataTransfer.getData(dataTransferKey));
            }}

            onDragOver={event => {
                event.preventDefault();
            }}
        >
            {props.children}
        </div>
    );
};