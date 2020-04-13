import {Action, BaseModel, InputType} from '@projectstorm/react-canvas-core';
import {DiagramEngine, LinkModel, NodeModel} from '@projectstorm/react-diagrams';

/**
 * Copy/Paste/Cut all selected items
 */
export class CopyPasteItemsAction extends Action {
    // it is a some sort of hack
    private static clipboard: BaseModel[] = [];

    constructor() {
        const keyCut = 88;
        const keyCopy = 67;
        const keyPaste = 86;

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
                    CopyPasteItemsAction.clipboard = model.getSelectedEntities();
                    model.clearSelection();
                }

                if (keyCode === keyCut) {
                    CopyPasteItemsAction.clipboard = model.getSelectedEntities();

                    for (let item of CopyPasteItemsAction.clipboard) {
                        item.remove();
                    }

                    engine.repaintCanvas();
                }

                if (keyCode === keyPaste) {
                    let itemMap = {};
                    for (let item of CopyPasteItemsAction.clipboard) {
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

                                const sFound = CopyPasteItemsAction.clipboard.find(a => a.getID() === sID);
                                const tFound = CopyPasteItemsAction.clipboard.find(a => a.getID() === tID);

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

                    for (let item of CopyPasteItemsAction.clipboard) {
                        item.setSelected(false);
                    }

                    engine.repaintCanvas();
                }
            }
        });
    }
}