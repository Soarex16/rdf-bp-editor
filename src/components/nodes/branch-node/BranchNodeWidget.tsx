import React, {useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {BranchNodeModel} from './BranchNodeModel';

import {inPortName, NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as BranchIcon} from '../../../assets/icons/branch-formula.svg';

import classes from './BranchNodeWidget.module.scss';
import nodeClasses from '../node/NodeWidget.module.scss';

export interface BranchNodeWidgetProps {
    node: BranchNodeModel;
    engine: DiagramEngine;
}

export const BranchNode: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={`${props.className || ''} ${nodeClasses.node__title_icon_only} ${classes.node__header_theme_branch}`}
            icon={() => <BranchIcon className={nodeClasses.node__icon}/>}
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const BranchNodeDiagramWidget: React.FunctionComponent<BranchNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div>
            <BranchNode
                className={nodeClasses.node__header_position_center}
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                left={() => <Port
                    className={`${nodeClasses.node__portIn_position_border} ${classes.node__port_theme_branch}`}
                    engine={props.engine}
                    port={props.node.getPort(inPortName)}
                />}
                right={() => <Port
                    className={`${nodeClasses.node__portOut_position_border} ${classes.node__port_theme_branch}`}
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={`${nodeClasses.node__content_position_center} ${nodeClasses.node__content_layout_column}`}
            >
                PLACEHOLDER
                <br/>
                PLACEHOLDER
                <br/>
                PLACEHOLDER
                <br/>
                PLACEHOLDER
            </NodeContent>
        </div>
    );
};
