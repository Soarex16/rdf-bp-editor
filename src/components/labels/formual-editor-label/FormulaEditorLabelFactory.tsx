import React from 'react';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {FormulaEditorLabelModel, formulaEditorLabelType} from './FormulaEditorLabelModel';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import {FormulaEditorLabelWidget} from './FormulaEditorLabelWidget';

export class FormulaEditorLabelFactory extends AbstractReactFactory<FormulaEditorLabelModel, DiagramEngine> {
    constructor() {
        super(formulaEditorLabelType);
    }

    generateModel(): FormulaEditorLabelModel {
        return new FormulaEditorLabelModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<FormulaEditorLabelModel>): JSX.Element {
        return <FormulaEditorLabelWidget model={event.model}/>;
    }
}