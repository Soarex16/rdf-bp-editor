import {DefaultLinkFactory} from '@projectstorm/react-diagrams';
import {BranchLinkModel, branchLinkType} from './BranchLinkModel';

export class BranchLinkFactory extends DefaultLinkFactory<BranchLinkModel> {
    constructor() {
        super(branchLinkType);
    }

    generateModel(event: any): BranchLinkModel {
        return new BranchLinkModel();
    }
}