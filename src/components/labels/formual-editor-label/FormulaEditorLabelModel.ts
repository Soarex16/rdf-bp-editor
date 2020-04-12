import {LabelModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';

export const formulaEditorLabelType: string = 'formula-label';

export interface FormulaEditorLabelOptions extends BaseModelOptions {
    formula?: string;
}

export class FormulaEditorLabelModel extends LabelModel {
    formula: string;

    constructor(options: FormulaEditorLabelOptions = {}) {
        super({
            ...options,
            type: formulaEditorLabelType
        });
        this.formula = options.formula || '';
    }

    serialize() {
        return {
            ...super.serialize(),
            formula: this.formula
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.formula = event.data.formula;
    }
}