import React, {ChangeEvent, useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {SparQLInputNodeModel} from './SparQLInputNodeModel';

import {NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as InputIcon} from '../../../assets/icons/database.svg';

import styles from './SparQLInputNodeWidget.module.scss';
import nodeStyles from '../node/NodeWidget.module.scss';

export interface SparQLInputNodeWidgetProps {
    node: SparQLInputNodeModel;
    engine: DiagramEngine;
}

const SparQLInputNodeHeader: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={`${nodeStyles.node__header_position_center} ${styles.node__header_theme_sparql}`}
            icon={() => <InputIcon className={nodeStyles.node__icon}/>}
            title="Входные факты"
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const SparQLInputNodeWidget: React.FunctionComponent<SparQLInputNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    const [resultSetAlias, setResultSetAlias] = useState(props.node.resultSetAlias);
    const handleAliasChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        const newVal = ev.target.value.trim();
        setResultSetAlias(newVal);
        props.node.resultSetAlias = newVal;
    }, []);

    return (
        <div>
            <SparQLInputNodeHeader
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                right={() => <Port
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={`${nodeStyles.node__content_position_center} ${nodeStyles.node__content_layout_column}`}
            >
                SPARQL запрос:
                <textarea/>

                Result set alias:
                <input value={resultSetAlias} onChange={handleAliasChange}/>
            </NodeContent>
        </div>
    );
};
