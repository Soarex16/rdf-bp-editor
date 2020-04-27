import React from 'react';

import {DiagramEngine} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';

import classes from './DiagramContainer.module.scss';

export interface DiagramContainerProps {
    engine: DiagramEngine
}

const DiagramContainer: React.FC<DiagramContainerProps & React.HTMLAttributes<HTMLDivElement>> = ({engine}) => {
    const canvasWidgetRef = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        const zoomMultiplier = engine.getModel().getZoomLevel() * 5 * 0.1;
        const newGridSize = engine.getModel().getZoomLevel() / 100 / 10 * 0.7;

        const minZoom = 75;
        const maxZoom = 200;

        // Аргументы коллбеков имеют тип any, потому что registerListener не принимает
        // сигнатуры методов с типами, экземплярами которого эти собтия являются
        // See DiagramListener for more information

        // event: BaseEntityEvent<CanvasModel> & { zoom: number; }
        const updateGridZoom = (event: any) => {
            // if reference to bg element is empty
            if (!canvasWidgetRef.current)
                return;

            if (event.zoom < minZoom) {
                // не позволяем масштабировать модель (сами ноды)
                engine.getModel().setZoomLevel(minZoom);
                return;
            }

            if (event.zoom > maxZoom) {
                engine.getModel().setZoomLevel(maxZoom);
                return;
            }

            const newZoom: number = event.zoom / zoomMultiplier;

            requestAnimationFrame(() => {
                canvasWidgetRef.current.style.background = `radial-gradient(circle, var(--canvas-dot-color) ${newGridSize}rem, transparent ${newGridSize}rem)`;
                canvasWidgetRef.current.style.backgroundColor = `var(--canvas-background)`;
                canvasWidgetRef.current.style.backgroundSize = `${newZoom}rem ${newZoom}rem`;
            });
        };

        // event: BaseEntityEvent<CanvasModel> & { offsetX: number; offsetY: number; }
        const updateGridOffset = (event: any) => {
            if (!canvasWidgetRef.current)
                return;

            requestAnimationFrame(() => {
                canvasWidgetRef.current.style.backgroundPosition = `${event.offsetX}px ${event.offsetY}px`;
            });
        };

        const canvasListener = {
            'offsetUpdated': updateGridOffset,
            'zoomUpdated': updateGridZoom
        };

        engine.getModel().registerListener(canvasListener);
    }, [engine, canvasWidgetRef]);

    // outer div is a paper background (because f*****g CanvasWidget doesn't accepts refs)
    return (
        <div
            ref={canvasWidgetRef}
            className={classes.diagramContainer}
        >
            <CanvasWidget className={classes.canvasWidget} engine={engine}/>
        </div>
    );
};

export default DiagramContainer;
