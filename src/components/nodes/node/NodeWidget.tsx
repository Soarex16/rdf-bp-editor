import React from 'react';
import {DiagramEngine, PortWidget} from '@projectstorm/react-diagrams-core';
import {PortModel} from '@projectstorm/react-diagrams';
import classes from './NodeWidget.module.scss';
import clsx from 'clsx';

export const inPortName = 'in';
export const outPortName = 'out';

export interface PortProps {
    engine: DiagramEngine;
    port: PortModel;
}

export const Port: React.FC<PortProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <PortWidget
            engine={props.engine}
            port={props.port}
            className={clsx(classes.node__port, props.className)}
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
            className={clsx(classes.node__header, props.className, selected && classes.node__header_selected)}
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
        <div className={clsx(classes.node__content, props.className)}>
            {children}
        </div>
    );
};
