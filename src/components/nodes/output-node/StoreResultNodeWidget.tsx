import React, {ChangeEvent, useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {StoreResultNodeModel} from './StoreResultNodeModel';

import {inPortName, NodeContent, NodeHeader, NodeHeaderProps, Port} from '../node/NodeWidget';
import {ReactComponent as InputIcon} from '../../../assets/icons/database.svg';

import classes from './StoreResultNodeWidget.module.scss';
import nodeClasses from '../node/NodeWidget.module.scss';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';

export interface StoreResultNodeWidgetProps {
    node: StoreResultNodeModel;
    engine: DiagramEngine;
}

export const StoreResultNode: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    const [t, i18n] = useTranslation();

    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={clsx(props.className, classes.node__header_theme_store_output)}
            icon={() => <InputIcon className={nodeClasses.node__icon}/>}
            title={t('nodes.output.title')}
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const StoreResultNodeDiagramWidget: React.FunctionComponent<StoreResultNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    const [t, i18n] = useTranslation();

    const [resultSetAlias, setResultSetAlias] = useState(props.node.resultSetAlias);
    const handleAliasChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        const newVal: string = ev.target.value;
        setResultSetAlias(newVal);
        props.node.resultSetAlias = newVal;
    }, [props.node.resultSetAlias]);

    return (
        <div>
            <StoreResultNode
                className={nodeClasses.node__header_position_center}
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                left={() => <Port
                    className={clsx(nodeClasses.node__portIn_position_border, classes.node__port_theme_store_output)}
                    engine={props.engine}
                    port={props.node.getPort(inPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={clsx(nodeClasses.node__content_position_center, nodeClasses.node__content_layout_column)}
            >
                {t('nodes.output.body.resultLabel')}
                <input
                    className={classes.outputNode__input}
                    value={resultSetAlias}
                    onChange={handleAliasChange}
                    placeholder={'Label'}
                />
            </NodeContent>
        </div>
    );
};
