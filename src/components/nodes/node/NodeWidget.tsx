import React from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {NodeModel, PortModel} from '@projectstorm/react-diagrams';
import classes from './NodeWidget.module.scss';

export interface NodeWidgetProps {
    node: NodeModel;
    engine: DiagramEngine;
}

export const inPortName = 'in';
export const outPortName = 'out';

// just for demo (может в тесты вынести)
/*const NodeWidget: React.FunctionComponent<NodeWidgetProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const toggleContentVisibility = useCallback(() => setOpened(!opened), [opened]);

    return (
        <div className={classes.node}>
            <div onDoubleClick={toggleContentVisibility}>
                <NodeHeader
                    icon={() => <BranchIcon className={classes.node__icon}/>}
                    title="Example node"
                />
            </div>

            {/!*
                порты располагаются в виджете, потому что не являются обязательным элементом ноды
                например, если мы рендерим ноду в палитре, то ей не надо иметь NodeContent и порты
            *!/}
            <NodeContent opened={opened}>
                PLACEHOLDER
            </NodeContent>
        </div>
    );
};*/

export interface PortProps {
    engine: DiagramEngine;
    port: PortModel;
}

export const Port: React.FC<PortProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <PortWidget
            engine={props.engine}
            port={props.port}
            className={`${classes.node__port} ${props.className || ''}`}
        >
            <div className={classes.node__port_ClickArea_big}/>
        </PortWidget>
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
            className={`${classes.node__header} ${props.className || ''} ${selected ? classes.node__header_selected : ''}`}
            onDoubleClick={props.onDoubleClick}
        >
            {props.left &&
            <div className={classes.node__header__portContainer}>
                {props.left()}
            </div>
            }

            {title &&
            <div className={classes.node__title}>
                {title}
            </div>
            }

            {icon()}

            {props.right &&
            <div className={classes.node__header__portContainer}>
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
        <div className={`${classes.node__content} ${props.className || ''}`}>
            {children}
        </div>
    );
};
