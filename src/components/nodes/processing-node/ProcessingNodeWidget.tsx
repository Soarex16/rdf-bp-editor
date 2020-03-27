import React, {useCallback, useState} from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {ProcessingNodeModel} from './ProcessingNodeModel';
import styles from './ProcessingNodeWidget.module.scss';

import icon from '../../../assets/icons/cogs.svg';

export interface ProcessingNodeWidgetProps {
    node: ProcessingNodeModel;
    engine: DiagramEngine;
}

//TODO: при попытке стереть в текстовой ноде она удаляется, эвенты пропускает через себя react-diagrams
// может надо будет отдельный обработчик?
export const ProcessingNodeWidget: React.FunctionComponent<ProcessingNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div className={styles.nodeWidget}>
            <div className={styles.nodeHeader}>
                <div className={styles.nodeTitle} onDoubleClick={toggleContentVisibility}>
                    Обработка
                </div>

                <img src={icon} className={styles.nodeIcon} width={20}/>

                <PortWidget
                    engine={props.engine}
                    port={props.node.getPort('in')}
                    className={[styles.circlePort, styles.circlePortIn].join(' ')}
                />

                <PortWidget
                    engine={props.engine}
                    port={props.node.getPort('out')}
                    className={[styles.circlePort, styles.circlePortOut].join(' ')}
                />
            </div>

            <div className={styles.nodeContent} style={{visibility: opened ? 'visible' : 'hidden'}}>
                Скрипт обработки:
                <select className={styles.processingScript}>
                    <option>Поиск клиента в базе</option>
                    <option>Проверка полноты введенных данных</option>
                    <option>Отправка на доработку</option>
                    <option>Уточнение данных</option>
                </select>

                <textarea/>
            </div>
        </div>
    );
};
