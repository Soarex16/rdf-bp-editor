import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {FormulaEditorLabelModel} from '../../labels/formual-editor-label/FormulaEditorLabelModel';

export class BranchLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: 'branch'
        });

        this.addLabel(
            new FormulaEditorLabelModel({
                formula: '\\text{predicate}'
            })
        );

        this.addLabel(
            new FormulaEditorLabelModel({
                formula: '\\text{alias}'
            })
        )
    }
}