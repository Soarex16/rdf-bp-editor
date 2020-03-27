import React from 'react';

import DiagramContainer from '../layout/diagram-container/DiagramContainer';

import {ThemeProvider} from '../layout/theme-context/theme-provider';
import styles from './Editor.module.scss';

import mockEngine from '../../mocks/testEngine';

const themes = ['theme-light', 'theme-dark'];

const Editor: React.FC = () => {
    return (
        <ThemeProvider themes={themes}>
            <div className={styles.editor}>
                <DiagramContainer engine={mockEngine}/>
            </div>
        </ThemeProvider>
    )
};

export default Editor;
