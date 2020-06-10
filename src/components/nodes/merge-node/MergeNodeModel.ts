import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {inPortName, outPortName} from '../node/NodeWidget';
import {BranchPortModel} from '../../ports/branch-port/BranchPortModel';
import {FlowPortModel} from '../../ports/flow-port/FlowPortModel';

export const mergeNodeType: string = 'merge-node';

export class MergeNodeModel extends NodeModel {

    constructor(options: BaseModelOptions = {}) {
        super({
            ...options,
            type: mergeNodeType
        });

        this.addPort(
            new BranchPortModel({
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
            ...super.serialize()
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
