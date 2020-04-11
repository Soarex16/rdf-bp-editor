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

                console.log('dragged', data);
                console.log('dragged model', model.serialize());

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
            width: '100%',

            boxSizing: 'border-box',
            padding: 10,
            background: 'var(--node-content-background-color)',
            borderBottom: 'solid 2px var(--node-content-border-color)',

            display: 'flex',
            alignItems: 'center',
            zIndex: 1,

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