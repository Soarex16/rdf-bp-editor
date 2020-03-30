import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {FlowPortModel} from '../../ports/flow-port/FlowPortModel';

export interface SparQLInputNodeModelOptions extends BaseModelOptions {
    graphQLQuery?: string;
}

export class SparQLInputNodeModel extends NodeModel {
    graphQLQuery: string;

    constructor(options: SparQLInputNodeModelOptions = {}) {
        super({
            ...options,
            type: 'sparql-input-node'
        });
        this.graphQLQuery = options.graphQLQuery || '';

        this.addPort(
            new FlowPortModel({
                in: false,
                name: 'out'
            })
        );
    }

    serialize() {
        return {
            ...super.serialize(),
            graphQLQuery: this.graphQLQuery
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.graphQLQuery = event.data.graphQLQuery;
    }
}
