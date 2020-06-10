import React, {useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {MergeNodeModel} from './MergeNodeModel';

import {inPortName, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as MergeIcon} from '../../../assets/icons/source-merge.svg';

import classes from './MergeNodeWidget.module.scss';
import nodeClasses from '../node/NodeWidget.module.scss';
import clsx from 'clsx';

export interface MergeNodeWidgetProps {
    node: MergeNodeModel;
    engine: DiagramEngine;
}

export const MergeNode: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={clsx(props.className, nodeClasses.node__title_icon_only, classes.node__header_theme_merge)}
            icon={() => <MergeIcon className={nodeClasses.node__icon}/>}
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const MergeNodeDiagramWidget: React.FunctionComponent<MergeNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div>
            <MergeNode
                className={nodeClasses.node__header_position_center}
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                left={() => <Port
                    className={clsx(nodeClasses.node__portIn_position_border, classes.node__port_theme_merge)}
                    engine={props.engine}
                    port={props.node.getPort(inPortName)}
                />}
                right={() => <Port
                    className={clsx(nodeClasses.node__portOut_position_border, classes.node__port_theme_merge)}
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />
        </div>
    );
};
