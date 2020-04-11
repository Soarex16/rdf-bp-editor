import {DefaultLinkModel} from '@projectstorm/react-diagrams';

export const flowLinkType: string = 'flow-link';

export class FlowLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: flowLinkType
        });
    }
}