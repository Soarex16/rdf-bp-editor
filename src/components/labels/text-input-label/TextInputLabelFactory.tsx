import React from 'react';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {TextInputLabelModel, textInputLabelType} from './TextInputLabelModel';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import {TextInputLabelWidget} from './TextInputLabelWidget';

export class TextInputLabelFactory extends AbstractReactFactory<TextInputLabelModel, DiagramEngine> {
    constructor() {
        super(textInputLabelType);
    }

    generateModel(): TextInputLabelModel {
        return new TextInputLabelModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<TextInputLabelModel>): JSX.Element {
        return <TextInputLabelWidget model={event.model}/>;
    }
}