import {DefaultLinkFactory} from '@projectstorm/react-diagrams';
import {BranchLinkModel} from './BranchLinkModel';

export class BranchLinkFactory extends DefaultLinkFactory {
    constructor() {
        super('branch');
    }

    generateModel(): BranchLinkModel {
        return new BranchLinkModel();
    }
}