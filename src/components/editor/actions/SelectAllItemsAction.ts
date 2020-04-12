import {Action, InputType} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams';

/**
 * Selects all items on diagram
 */
export class SelectAllItemsAction extends Action {
    constructor() {
        const keyA = 65;

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