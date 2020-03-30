import React from 'react';
import {BranchNodeModel} from './BranchNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BranchNodeWidget} from './BranchNodeWidget';

export class BranchNodeFactory extends AbstractReactFactory<BranchNodeModel, DiagramEngine> {
    constructor() {
        super('branch-node');
    }

    generateModel(): BranchNodeModel {
        return new BranchNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<BranchNodeModel>): JSX.Element {
        return <BranchNodeWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
