import {DefaultPortModel} from '@projectstorm/react-diagrams';
import {BranchLinkModel} from '../../links/branch-link/BranchLinkModel';


export class BranchPortModel extends DefaultPortModel {
    createLinkModel(): BranchLinkModel | null {
        return new BranchLinkModel();
    }
}