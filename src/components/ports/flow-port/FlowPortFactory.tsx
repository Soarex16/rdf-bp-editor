import {AbstractModelFactory} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {FlowPortModel, flowPortType} from './FlowPortModel';

export class FlowPortFactory extends AbstractModelFactory<FlowPortModel, DiagramEngine> {
    constructor() {
        super(flowPortType);
    }

    generateModel(): FlowPortModel {
        return new FlowPortModel({
            name: 'out'
        });
    }
}
