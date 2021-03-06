import {DefaultPortModel, PortModel, PortModelGenerics} from '@projectstorm/react-diagrams';
import {BranchLinkModel} from '../../links/branch-link/BranchLinkModel';
import {DefaultPortModelOptions} from '@projectstorm/react-diagrams-defaults';
import {FormulaEditorLabelModel} from '../../labels/formual-editor-label/FormulaEditorLabelModel';
import {TextInputLabelModel} from '../../labels/text-input-label/TextInputLabelModel';

export const branchPortType: string = 'branch-port';

export class BranchPortModel extends DefaultPortModel {
   constructor(options: DefaultPortModelOptions) {
       super({
           ...options,
           type: branchPortType
       });
   }

    createLinkModel(): BranchLinkModel {
        const model = new BranchLinkModel();

        model.addLabel(new FormulaEditorLabelModel({
            formula: `\\text{predicate}`
        }));

        model.addLabel(new TextInputLabelModel({
            value: 'label'
        }));

        return model;
    }

    // запрещаем более одной связи между каждой парой портов
    // не делаем так у branch port, потому что у него может быть несколько условий для пары портов
    canLinkToPort(port: PortModel<PortModelGenerics>): boolean {
        // из конца в начало не соединяем
        if (this.options.in) {
            return false;
        }

        // тут мы не запрещаем более одной связи между каждой парой портов
        // потому что у branch-node может быть несколько условий для пары портов

        return super.canLinkToPort(port);
    }
}