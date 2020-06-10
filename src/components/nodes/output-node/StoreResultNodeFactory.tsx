import * as React from 'react';
import {StoreResultNodeModel, storeResultNodeType} from './StoreResultNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {StoreResultNodeDiagramWidget} from './StoreResultNodeWidget';

export class StoreResultNodeFactory extends AbstractReactFactory<StoreResultNodeModel, DiagramEngine> {
    constructor() {
        super(storeResultNodeType);
    }

    generateModel(): StoreResultNodeModel {
        return new StoreResultNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<StoreResultNodeModel>): JSX.Element {
        return <StoreResultNodeDiagramWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
