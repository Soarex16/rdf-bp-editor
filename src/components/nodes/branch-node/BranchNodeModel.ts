import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {BranchPortModel} from '../../ports/branch-port/BranchPortModel';
import {inPortName, outPortName} from '../node/NodeWidget';

export const branchNodeNodeName: string = 'branch-node';

export interface ProcessingNodeModelOptions extends BaseModelOptions {
    processingScriptName?: string;
}

export class BranchNodeModel extends NodeModel {
    processingScriptName: string;

    constructor(options: ProcessingNodeModelOptions = {}) {
        super({
            ...options,
            type: branchNodeNodeName
        });
        this.processingScriptName = options.processingScriptName || '';

        this.addPort(
            new DefaultPortModel({
                in: true,
                name: inPortName
            })
        );

        this.addPort(
            new BranchPortModel({
                in: false,
                name: outPortName
            })
        );
    }

    serialize() {
        return {
            ...super.serialize(),
            processingScriptName: this.processingScriptName
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.processingScriptName = event.data.processingScriptName;
    }
}
