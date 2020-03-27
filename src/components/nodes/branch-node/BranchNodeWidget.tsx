import React, {useCallback, useState} from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {BranchNodeModel} from './BranchNodeModel';
import styles from './BranchNodeWidget.module.scss';

import branch from '../../../assets/icons/branch.svg';

export interface BranchNodeWidgetProps {
    node: BranchNodeModel;
    engine: DiagramEngine;
}

{/*<svg width={size} height={size} className={styles.nodeTitle} onDoubleClick={toggleContentVisibility}>
                    <polygon
                        height={size}
                        width={size}
                        points={`${size/2},0 ${size},${size/2}, ${size/2},${size} 0,${size/2}`}
                    >
                        <use href={branch}/>
                    </polygon>
                </svg>*/
}

//TODO: при попытке стереть в текстовой ноде она удаляется, эвенты пропускает через себя react-diagrams
// может надо будет отдельный обработчик?
export const BranchNodeWidget: React.FunctionComponent<BranchNodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);

    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div className={styles.nodeWidget}>
            <div className={styles.nodeHeader}>
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

            <div className={styles.nodeContent} style={{visibility: opened ? 'visible' : 'hidden'}}>
                PLACEHOLDER
            </div>
        </div>
    );
};
