import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {inPortName, outPortName} from '../node/NodeWidget';
import {FlowPortModel} from '../../ports/flow-port/FlowPortModel';

export const processingNodeType: string = 'processing-node';

export interface ProcessingNodeModelOptions extends BaseModelOptions {
    processingRule?: string;
}

export class ProcessingNodeModel extends NodeModel {
    processingRule: string;

    constructor(options: ProcessingNodeModelOptions = {}) {
        super({
            ...options,
            type: processingNodeType
        });
        this.processingRule = options.processingRule || `f:X\\rightarrow X`;

        this.addPort(
            new FlowPortModel({
                in: true,
                name: inPortName
            })
        );

        this.addPort(
            new FlowPortModel({
                in: false,
                name: outPortName
            })
        );
    }

    serialize() {
        return {
            ...super.serialize(),
            processingScriptName: this.processingRule
        }
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.processingRule = event.data.processingScriptName;
    }
}
