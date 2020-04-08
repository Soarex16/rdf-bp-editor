import * as React from 'react';
import {SparQLInputNodeModel, sparQLInputNodeName} from './SparQLInputNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent, ListenerHandle} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SparQLInputNodeWidget} from './SparQLInputNodeWidget';
import {FormulaEditorLabelModel} from '../../labels/formual-editor-label/FormulaEditorLabelModel';
import {FlowLinkModel} from '../../links/flow-link/FlowLinkModel';

export class SparQLInputNodeFactory extends AbstractReactFactory<SparQLInputNodeModel, DiagramEngine> {
    // save the event handle to register it only once
    updateLinkEventHandle: ListenerHandle;

    constructor() {
        super(sparQLInputNodeName);
    }

    generateModel(): SparQLInputNodeModel {
        return new SparQLInputNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<SparQLInputNodeModel>): JSX.Element {
        // automatically set FlowLinkLabel alias equal to result set alias
        if (!this.updateLinkEventHandle) {
            // event: BaseEntityEvent & { link: LinkModel; isCreated: boolean; }
            const updateLinkLabel = (ev: any) => {
                if (ev.isCreated) {
                    const link = ev.link as FlowLinkModel;

                    if (ev.link.getSourcePort().getNode().getType() === 'sparql-input-node') {
                        const sourceNode: SparQLInputNodeModel = link.getSourcePort().getNode() as SparQLInputNodeModel;
                        (link.getLabels()[0] as FormulaEditorLabelModel).formula = `\\text{${sourceNode.resultSetAlias}}`;
                    }
                }
            };

            this.updateLinkEventHandle = this.engine.getModel().registerListener({
                'linksUpdated': updateLinkLabel
            });
        }

        return <SparQLInputNodeWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
