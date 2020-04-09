import * as React from 'react';
import {ProcessingNodeModel, processingNodeName} from './ProcessingNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {ProcessingNodeDiagramWidget} from './ProcessingNodeWidget';

export class ProcessingNodeFactory extends AbstractReactFactory<ProcessingNodeModel, DiagramEngine> {
    constructor() {
        super(processingNodeName);
    }

    generateModel(): ProcessingNodeModel {
        return new ProcessingNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<ProcessingNodeModel>): JSX.Element {
        return <ProcessingNodeDiagramWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
