import React, {ChangeEvent, useCallback, useState} from 'react';
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
    const [resultSetAlias, setResultSetAlias] = useState(props.node.resultSetAlias);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    const handleAliasChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        const newVal = ev.target.value.trim();
        setResultSetAlias(newVal);
        props.node.resultSetAlias = newVal;
    }, []);

    return (
        <div className={styles.nodeWidget}>
            <div className={[styles.nodeHeader, props.node.isSelected() ? styles.selected : null].join(' ')}>
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

            {opened && <div className={styles.nodeContent}>
                SPARQL запрос:
                <textarea/>

                Result set alias:
                <input value={resultSetAlias} onChange={handleAliasChange}/>
            </div>}
        </div>
    );
};
