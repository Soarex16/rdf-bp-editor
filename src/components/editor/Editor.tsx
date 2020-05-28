import React from 'react';

import mockEngine from '../../mocks/testEngine';

import DiagramContainer from '../layout/diagram-container/DiagramContainer';

import {ThemeProvider} from '../layout/theme-context/theme-provider';
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

import classes from './Editor.module.scss';
import {Dropdown, DropdownItem} from '../layout/dropdown/Dropdown';

import {ReactComponent as IconNew} from '../../assets/icons/file-plus.svg';
import {ReactComponent as IconUpload} from '../../assets/icons/upload.svg';
import {ReactComponent as IconDownload} from '../../assets/icons/download.svg';

import {useTranslation} from 'react-i18next';
import LanguageSwitcher from '../layout/lang-switcher/LanguageSwitcher';

import {FormulaPalette} from '../layout/formula-palette/FormulaPalette';


const themes = ['theme-light', 'theme-dark'];

const Editor: React.FC = () => {
    const engine: DiagramEngine = mockEngine;

    const [t, i18n] = useTranslation();

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

    const clearDiagram = () => {
        const clear = window.confirm('Вы действительно хотите продолжить без сохранения? Данное действие необратимо');

        if (clear) {
            engine.getModel().getModels().forEach(m => m.remove());
            engine.repaintCanvas();
        }
    };

    return (
        <ThemeProvider themes={themes}>
            <LanguageSwitcher/>

            <ThemeSwitcher/>

            <Zoom
                onDec={decreaseScale}
                onReset={resetScale}
                onInc={increaseScale}
                onLocate={zoomToFit}
            />

            <Help/>

            <NavBar>
                <NavBarBrand brand="FDTFE" title={t('editor.appName')}/>

                <NavMenu>
                    <Dropdown title={t('editor.navMenu.currentProject')}>
                        <DropdownItem onClick={clearDiagram} title={t('editor.navMenu.project.new')}>
                            <IconNew/>
                        </DropdownItem>

                        <DropdownItem onClick={saveDiagram} title={t('editor.navMenu.project.save')}>
                            <IconDownload/>
                        </DropdownItem>

                        <DropdownItem onClick={loadDiagram} title={t('editor.navMenu.project.load')}>
                            <IconUpload/>
                        </DropdownItem>
                    </Dropdown>

                    <NavMenuItem>
                        {t('editor.navMenu.projects')}
                    </NavMenuItem>

                    <NavMenuItem>
                        {t('editor.navMenu.processes')}
                    </NavMenuItem>

                    <NavMenuItem>
                        {t('editor.navMenu.data')}
                    </NavMenuItem>
                </NavMenu>

                <div className={classes.editor__paletteContainer}>
                    {t('editor.palette.title')}:

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

            <div className={classes.editor__formulaPaletteContainer}>
                <FormulaPalette />
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
