import React from 'react';
import {BranchNodeModel, branchNodeType} from './BranchNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BranchNodeDiagramWidget} from './BranchNodeWidget';

export class BranchNodeFactory extends AbstractReactFactory<BranchNodeModel, DiagramEngine> {
    constructor() {
        super(branchNodeType);
    }

    generateModel(): BranchNodeModel {
        return new BranchNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<BranchNodeModel>): JSX.Element {
        return <BranchNodeDiagramWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
