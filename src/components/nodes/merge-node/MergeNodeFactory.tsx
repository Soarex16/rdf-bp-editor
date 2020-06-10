import React from 'react';
import {MergeNodeModel, mergeNodeType} from './MergeNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {MergeNodeDiagramWidget} from './MergeNodeWidget';

export class MergeNodeFactory extends AbstractReactFactory<MergeNodeModel, DiagramEngine> {
    constructor() {
        super(mergeNodeType);
    }

    generateModel(): MergeNodeModel {
        return new MergeNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<MergeNodeModel>): JSX.Element {
        return <MergeNodeDiagramWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
