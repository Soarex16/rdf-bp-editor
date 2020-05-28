import React from 'react';
import {DiagramEngine, DiagramModel, NodeModel} from '@projectstorm/react-diagrams';

import classes from './NodePalette.module.scss';

interface NodePaletteItemProps {
    data: any;
    tooltip?: string;
}

const dataTransferKey: string = 'node-palette';

export const NodePaletteItem: React.FC<NodePaletteItemProps> = ({data, tooltip, children}) => {
    return (
        <div
            title={tooltip}
            draggable={true}
            onDragStart={event => {
                // wrap node with diagram model because we can't store node itself
                const model = new DiagramModel();
                model.addNode(data as NodeModel);

                const strData: string = JSON.stringify(model.serialize());
                event.dataTransfer.setData(dataTransferKey, strData);
            }}
        >
            {children}
        </div>
    );
};

export const NodePalette: React.FC = ({children}) => {

    return (
        <div className={classes.palette}>
            {React.Children.map(children, child => (
                <div className={classes.palette__item}>
                    {child}
                </div>
            ))}
        </div>
    );
};

interface NodePaletteDropReceiverProps {
    engine: DiagramEngine;
}

export const NodePaletteDropReceiver: React.FC<NodePaletteDropReceiverProps> = ({engine, children}) => {
    return (
        <div
            onDrop={event => {
                const data = JSON.parse(event.dataTransfer.getData(dataTransferKey));
                const model = new DiagramModel();
                model.deserializeModel(data, engine);

                const node = model.getNodes()[0];
                const mousePos = engine.getRelativeMousePoint(event);
                node.setPosition(mousePos);

                const n = node.clone();

                // add cloned node, because otherwise we cannot add many nodes of the same type
                engine.getModel().addNode(n);
                engine.repaintCanvas();
            }}

            onDragOver={event => {
                event.preventDefault();
            }}
        >
            {children}
        </div>
    );
};