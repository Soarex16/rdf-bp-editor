import React, {useCallback, useState} from 'react';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';

import {ProcessingNodeModel} from './ProcessingNodeModel';

import {inPortName, NodeContent, NodeHeader, NodeHeaderProps, outPortName, Port} from '../node/NodeWidget';
import {ReactComponent as CogsIcon} from '../../../assets/icons/cogs.svg';

import styles from './ProcessingNodeWidget.module.scss';
import nodeStyles from '../node/NodeWidget.module.scss';

export interface ProcessingNodeWidgetProps {
    node: ProcessingNodeModel;
    engine: DiagramEngine;
}

const ProcessingNodeHeader: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({selected = false, children, ...props}) => {
    return (
        <NodeHeader
            onDoubleClick={props.onDoubleClick}
            className={`${nodeStyles.node__header_position_center} ${styles.node__header_theme_processing}`}
            icon={() => <CogsIcon className={nodeStyles.node__icon}/>}
            title="Обработка"
            selected={selected}
            left={props.left}
            right={props.right}
        >
            {children}
        </NodeHeader>
    );
};

export const ProcessingNodeWidget: React.FunctionComponent<ProcessingNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div>
            <ProcessingNodeHeader
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
                Скрипт обработки:
                <select className={styles.processingScript}>
                    <option>Поиск клиента в базе</option>
                    <option>Проверка полноты введенных данных</option>
                    <option>Отправка на доработку</option>
                    <option>Уточнение данных</option>
                </select>

                <textarea/>
            </NodeContent>
        </div>
    );
};
