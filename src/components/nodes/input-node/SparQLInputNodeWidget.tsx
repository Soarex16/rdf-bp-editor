import React, {ChangeEvent, useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {SparQLInputNodeModel} from './SparQLInputNodeModel';

import {NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as InputIcon} from '../../../assets/icons/database.svg';

import classes from './SparQLInputNodeWidget.module.scss';
import nodeClasses from '../node/NodeWidget.module.scss';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';

export interface SparQLInputNodeWidgetProps {
    node: SparQLInputNodeModel;
    engine: DiagramEngine;
}

export const SparQLInputNode: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    const [t, i18n] = useTranslation();

    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={clsx(props.className, classes.node__header_theme_sparql)}
            icon={() => <InputIcon className={nodeClasses.node__icon}/>}
            title={t('nodes.input.title')}
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const SparQLInputNodeDiagramWidget: React.FunctionComponent<SparQLInputNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    const [t, i18n] = useTranslation();

    const [resultSetAlias, setResultSetAlias] = useState(props.node.resultSetAlias);
    const handleAliasChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        const newVal = ev.target.value.trim();
        setResultSetAlias(newVal);
        props.node.resultSetAlias = newVal;
    }, [props.node.resultSetAlias]);

    const [queryString, setQueryString] = useState<string>('');

    return (
        <div>
            <SparQLInputNode
                className={nodeClasses.node__header_position_center}
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                right={() => <Port
                    className={clsx(nodeClasses.node__portOut_position_border, classes.node__port_theme_sparql)}
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={clsx(nodeClasses.node__content_position_center, nodeClasses.node__content_layout_column)}
            >
                <div className={classes.sparqlNode__inputLabel}>{t('nodes.input.body.queryField')}</div>
                <textarea
                    className={classes.sparqlNode__input}
                    placeholder={'SELECT...'}
                    value={queryString}
                    onChange={(ev) => setQueryString(ev.target.value)}
                />

                <span className={classes.sparqlNode__inputLabel}>
                    {t('nodes.input.body.resultLabel')}
                </span>
                <input
                    className={classes.sparqlNode__input}
                    value={resultSetAlias}
                    onChange={handleAliasChange}
                    placeholder={'Label'}
                />
            </NodeContent>
        </div>
    );
};
