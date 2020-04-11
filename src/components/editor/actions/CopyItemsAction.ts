import {Action, BaseModel, InputType} from '@projectstorm/react-canvas-core';
import {DiagramEngine, LinkModel, NodeModel} from '@projectstorm/react-diagrams';

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
export class CopyItemsAction extends Action {
    // it is a some sort of hack
    private static clipboard: BaseModel[] = [];

    constructor(options: CopyItemsActionOptions = {}) {
        const keyCut = 88;
        const keyCopy = 67;
        const keyPaste = 86;
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

                const offset = {x: 100, y: 100};

                const model = engine.getModel();

                if (keyCode === keyCopy) {
                    CopyItemsAction.clipboard = model.getSelectedEntities();
                    model.clearSelection();
                }

                if (keyCode === keyCut) {
                    CopyItemsAction.clipboard = model.getSelectedEntities();

                    for (let item of CopyItemsAction.clipboard) {
                        item.remove();
                    }

                    engine.repaintCanvas();
                }

                if (keyCode === keyPaste) {
                    let itemMap = {};
                    for (let item of CopyItemsAction.clipboard) {
                        let newItem = item.clone(itemMap);

                        // offset the nodes slightly
                        if (newItem instanceof NodeModel) {
                            newItem.setPosition(newItem.getX() + offset.x, newItem.getY() + offset.y);
                            model.addNode(newItem);
                        } else if (newItem instanceof LinkModel) {
                            const sourcePort = newItem.getSourcePort();
                            const targetPort = newItem.getTargetPort();

                            // TODO: optimize

                            // copy link only if both nodes in selection
                            if (sourcePort && sourcePort.getNode() && targetPort && targetPort.getNode()) {
                                const sID = (item as LinkModel).getSourcePort().getNode().getID();
                                const tID = (item as LinkModel).getTargetPort().getNode().getID();

                                const sFound = CopyItemsAction.clipboard.find(a => a.getID() === sID);
                                const tFound = CopyItemsAction.clipboard.find(a => a.getID() === tID);

                                if (sFound && tFound) {

                                    // offset the link points
                                    newItem.getPoints().forEach(p => {
                                        p.setPosition(p.getX() + offset.x, p.getY() + offset.y);
                                    });
                                    model.addLink(newItem);
                                    console.log(newItem);
                                }
                            }
                        }
                        newItem.setSelected();
                    }

                    for (let item of CopyItemsAction.clipboard) {
                        item.setSelected(false);
                    }

                    engine.repaintCanvas();
                }
            }
        });
    }
}