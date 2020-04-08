import React, {useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {BranchNodeModel} from './BranchNodeModel';

import {inPortName, NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as BranchIcon} from '../../../assets/icons/branch-formula.svg';

import styles from './BranchNodeWidget.module.scss';
import nodeStyles from '../node/NodeWidget.module.scss';

export interface BranchNodeWidgetProps {
    node: BranchNodeModel;
    engine: DiagramEngine;
}

const BranchNodeHeader: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={`${nodeStyles.node__header_position_center} ${nodeStyles.node__title_icon_only} ${styles.node__header_theme_branch}`}
            icon={() => <BranchIcon className={nodeStyles.node__icon}/>}
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const BranchNodeWidget: React.FunctionComponent<BranchNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div>
            <BranchNodeHeader
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                left={() => <Port
                    engine={props.engine}
                    port={props.node.getPort(inPortName)}
                />}
                right={() => <Port
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={`${nodeStyles.node__content_position_center} ${nodeStyles.node__content_layout_column}`}
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
