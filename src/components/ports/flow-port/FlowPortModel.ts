import {DefaultPortModel} from '@projectstorm/react-diagrams';
import {FlowLinkModel} from '../../links/flow-link/FlowLinkModel';


export class FlowPortModel extends DefaultPortModel {
    createLinkModel(): FlowLinkModel | null {
        return new FlowLinkModel();
    }
}