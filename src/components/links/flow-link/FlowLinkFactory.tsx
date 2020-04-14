import {DefaultLinkFactory} from '@projectstorm/react-diagrams';
import {FlowLinkModel, flowLinkType} from './FlowLinkModel';

export class FlowLinkFactory extends DefaultLinkFactory<FlowLinkModel> {
    constructor() {
        super(flowLinkType);
    }

    generateModel(event: any): FlowLinkModel {
        return new FlowLinkModel();
    }
}