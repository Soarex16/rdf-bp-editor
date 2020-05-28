import React, {useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {ProcessingNodeModel} from './ProcessingNodeModel';

import {inPortName, NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as CogsIcon} from '../../../assets/icons/cogs.svg';

import classes from './ProcessingNodeWidget.module.scss';
import nodeClasses from '../node/NodeWidget.module.scss';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';

export interface ProcessingNodeWidgetProps {
    node: ProcessingNodeModel;
    engine: DiagramEngine;
}

export const ProcessingNode: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    const [t, i18n] = useTranslation();

    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={clsx(props.className, classes.node__header_theme_processing)}
            icon={() => <CogsIcon className={nodeClasses.node__icon}/>}
            title={t('nodes.processing.title')}
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const ProcessingNodeDiagramWidget: React.FunctionComponent<ProcessingNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    const [t, i18n] = useTranslation();

    return (
        <div>
            <ProcessingNode
                className={nodeClasses.node__header_position_center}
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                left={() => <Port
                    className={clsx(nodeClasses.node__portIn_position_border, classes.node__port_theme_processing)}
                    engine={props.engine}
                    port={props.node.getPort(inPortName)}
                />}
                right={() => <Port
                    className={clsx(nodeClasses.node__portOut_position_border, classes.node__port_theme_processing)}
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={clsx(nodeClasses.node__content_position_center, nodeClasses.node__content_layout_column)}
            >
                {t('nodes.processing.body.transformationRule')}
                <select className={classes.processingScript}>
                    <option>Поиск клиента в базе</option>
                    <option>Проверка полноты введенных данных</option>
                    <option>Отправка на доработку</option>
                    <option>Уточнение данных</option>
                </select>
            </NodeContent>
        </div>
    );
};
