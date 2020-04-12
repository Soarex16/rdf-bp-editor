import {LabelModel} from '@projectstorm/react-diagrams';
import {BaseModelOptions, DeserializeEvent} from '@projectstorm/react-canvas-core';

export const textInputLabelType: string = 'input-label';

export interface TextInputLabelOptions extends BaseModelOptions {
    value?: string;
}

export class TextInputLabelModel extends LabelModel {
    value: string;

    constructor(options: TextInputLabelOptions = {}) {
        super({
            ...options,
            type: textInputLabelType
        });
        this.value = options.value || '';
    }

    serialize() {
        return {
            ...super.serialize(),
            value: this.value
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.value = event.data.value;
    }
}