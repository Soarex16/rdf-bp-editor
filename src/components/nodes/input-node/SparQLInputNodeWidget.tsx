import React, {useCallback, useState} from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {SparQLInputNodeModel} from './SparQLInputNodeModel';
import styles from './SparQLInputNodeWidget.module.scss';

import icon from '../../../assets/icons/database.svg';

export interface SparQLInputNodeWidgetProps {
    node: SparQLInputNodeModel;
    engine: DiagramEngine;
}

//TODO: при попытке стереть в текстовой ноде она удаляется, эвенты пропускает через себя react-diagrams
// может надо будет отдельный обработчик?
export const SparQLInputNodeWidget: React.FunctionComponent<SparQLInputNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div className={styles.nodeWidget}>
            <div className={styles.nodeHeader}>
                <div className={styles.nodeTitle} onDoubleClick={toggleContentVisibility}>
                    Входные факты
                </div>

                <img src={icon} className={styles.nodeIcon} width={20}/>

                <PortWidget
                    engine={props.engine}
                    port={props.node.getPort('out')}
                    className={[styles.circlePort, styles.circlePortOut].join(' ')}
                />
            </div>

            <div className={styles.nodeContent} style={{visibility: opened ? 'visible' : 'hidden'}}>
                SPARQL запрос:
                <textarea/>
            </div>
        </div>
    );
};
