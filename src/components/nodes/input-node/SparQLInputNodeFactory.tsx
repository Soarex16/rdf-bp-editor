import * as React from 'react';
import {SparQLInputNodeModel, sparQLInputNodeType} from './SparQLInputNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SparQLInputNodeDiagramWidget} from './SparQLInputNodeWidget';

export class SparQLInputNodeFactory extends AbstractReactFactory<SparQLInputNodeModel, DiagramEngine> {
    constructor() {
        super(sparQLInputNodeType);
    }

    generateModel(): SparQLInputNodeModel {
        return new SparQLInputNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<SparQLInputNodeModel>): JSX.Element {
        return <SparQLInputNodeDiagramWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
