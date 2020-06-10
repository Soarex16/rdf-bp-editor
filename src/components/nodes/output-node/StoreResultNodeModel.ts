import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {inPortName} from '../node/NodeWidget';
import {FlowPortModel} from '../../ports/flow-port/FlowPortModel';

export const storeResultNodeType: string = 'result-output-node';

export interface StoreResultNodeModelOptions extends BaseModelOptions {
    graphQLQuery?: string;
    resultSetAlias?: string
}

export class StoreResultNodeModel extends NodeModel {
    static resultSetCounter: number = 1;

    resultSetAlias: string;

    constructor(options: StoreResultNodeModelOptions = {}) {
        super({
            ...options,
            type: storeResultNodeType
        });

        this.resultSetAlias = options.resultSetAlias || `process-result-${StoreResultNodeModel.resultSetCounter}`;
        StoreResultNodeModel.resultSetCounter++;

        this.addPort(
            new FlowPortModel({
                in: true,
                name: inPortName
            })
        );
    }

    serialize() {
        return {
            ...super.serialize(),
            resultSetAlias: this.resultSetAlias
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.resultSetAlias = event.data.resultSetAlias;
    }
}
