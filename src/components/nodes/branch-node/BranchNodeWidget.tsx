import React, {useCallback, useState} from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {BranchNodeModel} from './BranchNodeModel';
import styles from './BranchNodeWidget.module.scss';

import branch from '../../../assets/icons/branch.svg';

export interface BranchNodeWidgetProps {
    node: BranchNodeModel;
    engine: DiagramEngine;
}

//TODO: при попытке стереть в текстовой ноде она удаляется, эвенты пропускает через себя react-diagrams
// может надо будет отдельный обработчик?
export const BranchNodeWidget: React.FunctionComponent<BranchNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div className={styles.nodeWidget}>
            <div className={[styles.nodeHeader, props.node.isSelected() ? styles.selected : null].join(' ')}>
                <img src={branch} className={styles.nodeIcon} width={20} onDoubleClick={toggleContentVisibility}/>

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

            {opened && <div className={styles.nodeContent}>
                PLACEHOLDER
                <br/>
                PLACEHOLDER
                <br/>
                PLACEHOLDER
                <br/>
                PLACEHOLDER
            </div>}
        </div>
    );
};
