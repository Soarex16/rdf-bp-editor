import * as React from 'react';
import {SparQLInputNodeModel} from './SparQLInputNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SparQLInputNodeWidget} from './SparQLInputNodeWidget';

export class SparQLInputNodeFactory extends AbstractReactFactory<SparQLInputNodeModel, DiagramEngine> {
    constructor() {
        super('sparql-input-node');
    }

    generateModel(): SparQLInputNodeModel {
        return new SparQLInputNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<SparQLInputNodeModel>): JSX.Element {
        return <SparQLInputNodeWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
