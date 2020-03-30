import {DefaultLinkFactory} from '@projectstorm/react-diagrams';
import {FlowLinkModel} from './FlowLinkModel';

export class FlowLinkFactory extends DefaultLinkFactory {
    constructor() {
        super('flow');
    }

    generateModel(): FlowLinkModel {
        return new FlowLinkModel();
    }
}