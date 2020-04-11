import {AbstractModelFactory} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {BranchPortModel, branchPortType} from './BranchPortModel';

export class BranchPortFactory extends AbstractModelFactory<BranchPortModel, DiagramEngine> {
    constructor() {
        super(branchPortType);
    }

    generateModel(): BranchPortModel {
        return new BranchPortModel({
            name: 'out'
        });
    }
}
