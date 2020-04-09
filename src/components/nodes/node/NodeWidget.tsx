import React, {useCallback, useState} from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {NodeModel, PortModel} from '@projectstorm/react-diagrams';

import {ReactComponent as BranchIcon} from '../../../assets/icons/branch-formula.svg';
import styles from './NodeWidget.module.scss';

export interface NodeWidgetProps {
    node: NodeModel;
    engine: DiagramEngine;
}

export const inPortName = 'in';
export const outPortName = 'out';

// just for demo (может в тесты вынести)
const NodeWidget: React.FunctionComponent<NodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div className={styles.node}>
            <div onDoubleClick={toggleContentVisibility}>
                <NodeHeader
                    icon={() => <BranchIcon className={styles.node__icon}/>}
                    title="Example node"
                />
            </div>

            {/*
                порты располагаются в виджете, потому что не являются обязательным элементом ноды
                например, если мы рендерим ноду в палитре, то ей не надо иметь NodeContent и порты
            */}
            <NodeContent opened={opened}>
                PLACEHOLDER
            </NodeContent>
        </div>
    );
};

export interface PortProps {
    engine: DiagramEngine;
    port: PortModel;
}

export const Port: React.FC<PortProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <PortWidget
            engine={props.engine}
            port={props.port}
            className={`${styles.node__port} ${props.className || ''}`}
        />
    )
};

export interface NodeHeaderProps {
    title?: string;
    icon?: () => React.ReactNode;
    selected?: boolean;
    left?: () => JSX.Element;
    right?: () => React.ReactNode;
}

export const NodeHeader: React.FC<NodeHeaderProps & React.HTMLAttributes<HTMLDivElement>> = ({title, icon, selected = false, ...props}) => {
    return (
        <div
            className={`${styles.node__header} ${props.className || ''} ${selected ? styles.node__header_selected : ''}`}
            onDoubleClick={props.onDoubleClick}
        >
            {props.left &&
            <div className={styles.node__header__portContainer}>
                {props.left()}
            </div>
            }

            {title &&
            <div className={styles.node__title}>
                {title}
            </div>
            }

            {icon()}

            {props.right &&
            <div className={styles.node__header__portContainer}>
                {props.right()}
            </div>
            }
        </div>
    );
};

export interface NodeContentProps {
    opened?: boolean;
}

export const NodeContent: React.FC<NodeContentProps & React.HTMLAttributes<HTMLDivElement>> = ({opened = false, children, ...props}) => {
    return (
        opened &&
        <div className={`${styles.node__content} ${props.className || ''}`}>
            {children}
        </div>
    );
};
