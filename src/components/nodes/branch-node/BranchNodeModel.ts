import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {inPortName, outPortName} from '../node/NodeWidget';
import {BranchPortModel} from '../../ports/branch-port/BranchPortModel';
import {FlowPortModel} from '../../ports/flow-port/FlowPortModel';

export const branchNodeNodeType: string = 'branch-node';

export interface ProcessingNodeModelOptions extends BaseModelOptions {
    processingScriptName?: string;
}

export class BranchNodeModel extends NodeModel {
    processingScriptName: string;

    constructor(options: ProcessingNodeModelOptions = {}) {
        super({
            ...options,
            type: branchNodeNodeType
        });
        this.processingScriptName = options.processingScriptName || '';

        this.addPort(
            new FlowPortModel({
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
