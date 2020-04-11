import {Action, InputType} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams';

export interface CopyItemsActionOptions {
    keyCodes?: number[];
    modifiers?: {
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        metaKey?: boolean;
    };
}

/**
 * Copy all selected items
 */
export class SelectAllItemsAction extends Action {
    constructor(options: CopyItemsActionOptions = {}) {
        const keyA = 65;
        const modifiers = {
            ctrlKey: true,
            shiftKey: false,
            altKey: false,
            metaKey: false,
            ...options.modifiers
        };

        super({
            type: InputType.KEY_DOWN,
            fire: (event: any) => {
                const {keyCode, ctrlKey} = event.event;

                const engine = this.engine as DiagramEngine;

                if (!ctrlKey) {
                    return;
                }

                if (keyCode === keyA) {
                    const model = engine.getModel();
                    model.getNodes().forEach(n => n.setSelected());
                    model.getLinks().forEach(l => l.setSelected());
                }
            }
        });
    }
}