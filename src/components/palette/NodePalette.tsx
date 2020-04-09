import React from 'react';
import {DiagramEngine, DiagramModel, NodeModel} from '@projectstorm/react-diagrams';

interface PaletteItemProps {
    data: any;
    tooltip?: string;
}

const dataTransferKey: string = 'node-palette';

export const NodePaletteItem: React.FC<PaletteItemProps> = ({data, tooltip, children}) => {
    return (
        <div
            draggable={true}
            onDragStart={event => {
                // wrap node with diagram model because we can't store node itself
                const model = new DiagramModel();
                model.addNode(data as NodeModel);

                const strData: string = JSON.stringify(model.serialize());
                event.dataTransfer.setData(dataTransferKey, strData);
            }}
            style={{
                padding: '0 10px'
            }}
        >
            {children}
        </div>
    );
};

export const NodePalette: React.FC = ({children}) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            background: 'transparent',
            zIndex: 1
        }}>
            {children}
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

                // add cloned node, because otherwise we cannot add many nodes of the same type
                engine.getModel().addNode(node.clone());
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