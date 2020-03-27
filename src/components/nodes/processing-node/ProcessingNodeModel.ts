import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';

export interface ProcessingNodeModelOptions extends BaseModelOptions {
    processingScriptName?: string;
}

export class ProcessingNodeModel extends NodeModel {
    processingScriptName: string;

    constructor(options: ProcessingNodeModelOptions = {}) {
        super({
            ...options,
            type: 'processing-node'
        });
        this.processingScriptName = options.processingScriptName || '';

        this.addPort(
            new DefaultPortModel({
                in: true,
                name: 'in'
            })
        );

        this.addPort(
            new DefaultPortModel({
                in: false,
                name: 'out'
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
