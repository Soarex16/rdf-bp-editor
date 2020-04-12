import React from 'react';

import DiagramContainer from '../layout/diagram-container/DiagramContainer';

import {ThemeProvider} from '../layout/theme-context/theme-provider';

import mockEngine from '../../mocks/testEngine';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import Zoom from '../layout/zoom/Zoom';
import ThemeSwitcher from '../layout/theme-switcher/ThemeSwitcher';
import {NodePalette, NodePaletteDropReceiver, NodePaletteItem} from '../layout/node-palette/NodePalette';
import {SparQLInputNode} from '../nodes/input-node/SparQLInputNodeWidget';
import {BranchNode} from '../nodes/branch-node/BranchNodeWidget';
import {ProcessingNode} from '../nodes/processing-node/ProcessingNodeWidget';
import {SparQLInputNodeModel} from '../nodes/input-node/SparQLInputNodeModel';
import {BranchNodeModel} from '../nodes/branch-node/BranchNodeModel';
import {ProcessingNodeModel} from '../nodes/processing-node/ProcessingNodeModel';
import Help from '../layout/help/Help';
import NavBar, {NavBarBrand, NavMenu, NavMenuItem} from '../layout/nav-bar/NavBar';
import {Avatar, AvatarImage} from '../layout/avatar/Avatar';
import styles from './Editor.module.scss';

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

            <Help/>

            <NavBar>
                <NavBarBrand title="FDTFE"/>

                <NavMenu>
                    <NavMenuItem>
                        Projects
                    </NavMenuItem>

                    <NavMenuItem>
                        Operations
                    </NavMenuItem>

                    <NavMenuItem>
                        Data
                    </NavMenuItem>
                </NavMenu>

                <div className={styles.editor__paletteContainer}>
                    Palette:

                    <NodePalette>
                        <NodePaletteItem
                            data={new SparQLInputNodeModel()}
                        >
                            <SparQLInputNode/>
                        </NodePaletteItem>

                        <NodePaletteItem
                            data={new BranchNodeModel()}
                        >
                            <BranchNode/>
                        </NodePaletteItem>

                        <NodePaletteItem
                            data={new ProcessingNodeModel()}
                        >
                            <ProcessingNode/>
                        </NodePaletteItem>
                    </NodePalette>
                </div>

                <Avatar
                    icon={() => <AvatarImage src={'https://source.unsplash.com/NohB3FJSY90'}/>}
                    name="USR"
                />
            </NavBar>

            <div style={{
                position: 'absolute',
                bottom: '0',
                right: '50%',
                zIndex: 1,
                background: 'var(--node-content-background-color)',
                border: 'solid 2px var(--node-content-border-color)'
            }}>

            </div>

            <NodePaletteDropReceiver
                engine={engine}
            >
                <DiagramContainer
                    engine={engine}
                />
            </NodePaletteDropReceiver>
        </ThemeProvider>
    )
};

export default Editor;
