import React from 'react';

import {DiagramEngine} from '@projectstorm/react-diagrams';
import {CanvasWidget} from '@projectstorm/react-canvas-core';

import styles from './DiagramContainer.module.scss';
import {useTheme} from '../theme-context/theme-provider';

export interface DiagramContainerProps {
    engine: DiagramEngine
}

// TODO: запретить подключать выход ноды к ее входу

// TODO: попробовать вынести эвент в отдельный класс как тут
//  https://github.com/projectstorm/react-diagrams/blob/master/packages/diagrams-demo-gallery/demos/demo-custom-action/index.tsx
const DiagramContainer: React.FC<DiagramContainerProps> = ({engine}) => {
    const canvasWidgetRef = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        // 32 - background-size value in DiagramContainer.module.scss
        const zoomMultiplier = engine.getModel().getZoomLevel() / 32;

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
                canvasWidgetRef.current.style.backgroundSize = `${newZoom}px ${newZoom}px`;
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

    // TODO: experiments
    // const [isLightTheme, setLightTheme] = React.useState<boolean>(true);
    const {toggleTheme} = useTheme();
    const handleThemeChange = React.useCallback(() => toggleTheme(), [toggleTheme]);

    const increaseScale = () => {
        engine.getModel().setZoomLevel(engine.getModel().getZoomLevel() + 10);
        engine.repaintCanvas();
    };

    const decreaseScale = () => {
        engine.getModel().setZoomLevel(engine.getModel().getZoomLevel() - 10);
        engine.repaintCanvas();
    };

    const resetScale = () => {
        engine.getModel().setZoomLevel(100);
        engine.repaintCanvas();
    };

    const zoomToFit = () => {
        engine.zoomToFit();
    };

    // outer div is a paper background (because f*****g CanvasWidget doesn't accepts refs)
    return (
        <div ref={canvasWidgetRef}
             className={`${styles.diagramContainer}`}> {/*${isLightTheme ? styles.diagramContainer_light : styles.diagramContainer_dark}*/}
            <div style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                zIndex: 2
            }}>
                <button onClick={handleThemeChange}>Toggle theme</button>
                <br/>

                <button onClick={decreaseScale}>-</button>
                <button onClick={resetScale}>Reset</button>
                <button onClick={increaseScale}>+</button>

                <br/>
                <button onClick={zoomToFit}>Zoom to fit</button>
            </div>

            <CanvasWidget className={styles.canvasWidget} engine={engine}/>
        </div>
    );
};

export default DiagramContainer;
