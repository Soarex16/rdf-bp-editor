import {NodeModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';
import {outPortName} from '../node/NodeWidget';
import {FlowPortModel} from '../../ports/flow-port/FlowPortModel';

export const sparQLInputNodeType: string = 'sparql-input-node';

export interface SparQLInputNodeModelOptions extends BaseModelOptions {
    graphQLQuery?: string;
    resultSetAlias?: string
}

export class SparQLInputNodeModel extends NodeModel {
    static resultSetCounter: number = 1;

    graphQLQuery: string;
    resultSetAlias: string;

    constructor(options: SparQLInputNodeModelOptions = {}) {
        super({
            ...options,
            type: sparQLInputNodeType
        });
        this.graphQLQuery = options.graphQLQuery || '';

        this.resultSetAlias = options.resultSetAlias || `rdf-set-${SparQLInputNodeModel.resultSetCounter}`;
        SparQLInputNodeModel.resultSetCounter++;

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
            graphQLQuery: this.graphQLQuery,
            resultSetAlias: this.resultSetAlias
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.graphQLQuery = event.data.graphQLQuery;
        this.graphQLQuery = event.data.graphQLQuery;
    }
}
