import React, {useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {ProcessingNodeModel} from './ProcessingNodeModel';

import {inPortName, NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as CogsIcon} from '../../../assets/icons/cogs.svg';

import classes from './ProcessingNodeWidget.module.scss';
import nodeClasses from '../node/NodeWidget.module.scss';

export interface ProcessingNodeWidgetProps {
    node: ProcessingNodeModel;
    engine: DiagramEngine;
}

export const ProcessingNode: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={`${props.className || ''} ${classes.node__header_theme_processing}`}
            icon={() => <CogsIcon className={nodeClasses.node__icon}/>}
            title="Обработка"
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

    return (
        <div>
            <ProcessingNode
                className={nodeClasses.node__header_position_center}
                onDoubleClick={toggleContentVisibility}
                selected={props.node.isSelected()}
                left={() => <Port
                    className={`${nodeClasses.node__portIn_position_border} ${classes.node__port_theme_processing}`}
                    engine={props.engine}
                    port={props.node.getPort(inPortName)}
                />}
                right={() => <Port
                    className={`${nodeClasses.node__portOut_position_border} ${classes.node__port_theme_processing}`}
                    engine={props.engine}
                    port={props.node.getPort(outPortName)}
                />}
            />

            <NodeContent
                opened={opened}
                className={`${nodeClasses.node__content_position_center} ${nodeClasses.node__content_layout_column}`}
            >
                Скрипт обработки:
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
