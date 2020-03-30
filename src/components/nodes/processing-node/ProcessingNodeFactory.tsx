import * as React from 'react';
import {ProcessingNodeModel} from './ProcessingNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {ProcessingNodeWidget} from './ProcessingNodeWidget';

export class ProcessingNodeFactory extends AbstractReactFactory<ProcessingNodeModel, DiagramEngine> {
    constructor() {
        super('processing-node');
    }

    generateModel(): ProcessingNodeModel {
        return new ProcessingNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<ProcessingNodeModel>): JSX.Element {
        return <ProcessingNodeWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
