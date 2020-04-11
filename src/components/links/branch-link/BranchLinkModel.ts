import {DefaultLinkModel} from '@projectstorm/react-diagrams';

export const branchLinkType: string = 'branch-link';

export class BranchLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: branchLinkType
        });
    }
}