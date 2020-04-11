import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {inPortName, outPortName} from '../node/NodeWidget';
import {FlowPortModel} from '../../links/flow-link/FlowPortModel';

export const processingNodeType: string = 'processing-node';

export interface ProcessingNodeModelOptions extends BaseModelOptions {
    processingScriptName?: string;
}

export class ProcessingNodeModel extends NodeModel {
    processingScriptName: string;

    constructor(options: ProcessingNodeModelOptions = {}) {
        super({
            ...options,
            type: processingNodeType
        });
        this.processingScriptName = options.processingScriptName || '';

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
            processingScriptName: this.processingScriptName
        }
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.processingScriptName = event.data.processingScriptName;
    }
}
