import {LabelModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';

export interface FormulaEditorLabelOptions extends BaseModelOptions {
    formula?: string;
}

export class FormulaEditorLabelModel extends LabelModel {
    formula: string;

    constructor(options: FormulaEditorLabelOptions = {}) {
        super({
            ...options,
            type: 'formula'
        });
        this.formula = options.formula || '';
    }

    serialize() {
        return {
            ...super.serialize(),
            flowAlias: this.formula
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.formula = event.data.flowAlias;
    }
}