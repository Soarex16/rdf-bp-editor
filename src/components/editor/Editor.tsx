import React from 'react';

import DiagramContainer from '../layout/diagram-container/DiagramContainer';

import {ThemeProvider} from '../layout/theme-context/theme-provider';

import mockEngine from '../../mocks/testEngine';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import Zoom from './zoom/Zoom';
import ThemeSwitcher from './theme-switcher/ThemeSwitcher';

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

    const saveDiagram = () => {
        let data = engine.getModel().serialize();

        let link = document.createElement('a');
        link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
        link.setAttribute('download', 'diagram.json');

        link.click();
    };

    const loadDiagram = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e: Event) => {
            let file = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.files[0];
            let reader = new FileReader();

            reader.readAsText(file);

            reader.onload = () => {
                const rawModel = JSON.parse(reader.result as string);
                engine.getModel().deserializeModel(rawModel, engine);
                engine.repaintCanvas();
            };
        };

        input.click();
    };

    const repaint = () => engine.repaintCanvas();

    return (
        <ThemeProvider themes={themes}>
            <ThemeSwitcher/>

            <Zoom
                onDec={decreaseScale}
                onReset={resetScale}
                onInc={increaseScale}
            />

            <button onClick={saveDiagram}>Save</button>
            <button onClick={loadDiagram}>Load</button>
            <button onClick={repaint}>Repaint</button>

            <DiagramContainer engine={engine}/>
        </ThemeProvider>
    )
};

export default Editor;
