import * as React from 'react';
import {SparQLInputNodeModel, sparQLInputNodeType} from './SparQLInputNodeModel';
import {AbstractReactFactory, GenerateWidgetEvent, ListenerHandle} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {SparQLInputNodeDiagramWidget} from './SparQLInputNodeWidget';

export class SparQLInputNodeFactory extends AbstractReactFactory<SparQLInputNodeModel, DiagramEngine> {
    // save the event handle to register it only once
    updateLinkEventHandle: ListenerHandle;

    constructor() {
        super(sparQLInputNodeType);
    }

    generateModel(): SparQLInputNodeModel {
        return new SparQLInputNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<SparQLInputNodeModel>): JSX.Element {
        // TODO:
        // automatically set FlowLinkLabel alias equal to result set alias
        /*if (!this.updateLinkEventHandle) {
            // event: BaseEntityEvent & { link: LinkModel; isCreated: boolean; }
            const updateLinkLabel = (ev: any) => {
                if (ev.isCreated) {
                    const link = ev.link as BranchLinkModel;

                    if (ev.link.getSourcePort().getNode().getType() === 'sparql-input-node') {
                        const sourceNode: SparQLInputNodeModel = link.getSourcePort().getNode() as SparQLInputNodeModel;
                        (link.getLabels()[0] as FormulaEditorLabelModel).formula = `\\text{${sourceNode.resultSetAlias}}`;
                    }
                }
            };

            this.updateLinkEventHandle = this.engine.getModel().registerListener({
                'linksUpdated': updateLinkLabel
            });
        }*/

        return <SparQLInputNodeDiagramWidget engine={this.engine as DiagramEngine} node={event.model}/>;
    }

}
