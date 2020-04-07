import React from 'react';

import DiagramContainer from '../layout/diagram-container/DiagramContainer';

import {ThemeProvider} from '../layout/theme-context/theme-provider';

import mockEngine from '../../mocks/testEngine';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import Zoom from '../layout/zoom/Zoom';
import ThemeSwitcher from '../layout/theme-switcher/ThemeSwitcher';

const themes = ['theme-light', 'theme-dark'];

const Editor: React.FC = () => {
    const engine: DiagramEngine = mockEngine;

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

    return (
        <ThemeProvider themes={themes}>
            <ThemeSwitcher/>

            <Zoom
                onDec={decreaseScale}
                onReset={resetScale}
                onInc={increaseScale}
            />

            <DiagramContainer engine={engine}/>
        </ThemeProvider>
    )
};

export default Editor;
