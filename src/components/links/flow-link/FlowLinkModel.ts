import {DefaultLinkModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions} from '@projectstorm/react-canvas-core';
import {FormulaEditorLabelModel} from '../../labels/formual-editor-label/FormulaEditorLabelModel';

export interface FlowLinkModelOptions extends BaseModelOptions {
    predicateResult?: string;
}

export class FlowLinkModel extends DefaultLinkModel {
    predicateResult: string;

    constructor(options: FlowLinkModelOptions = {}) {
        super({
            ...options,
            type: 'flow'
        });
        this.predicateResult = options.predicateResult;

        //TODO: добавить эвент, которые будет выставлять formula исходя из имени (или id) source port

        this.addLabel(
            new FormulaEditorLabelModel({
                formula: '\\text{label}'
            })
        );
    }
}