import React from 'react';
import ReactDOM from 'react-dom';
import {addStyles} from 'react-mathquill';

import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

import Editor from './components/editor/Editor';

import './style.css';
import './assets/themes.scss';

// inject into <head> Mathquill styles
addStyles();

const App = (
    <I18nextProvider i18n={i18n}>
        <Editor/>
    </I18nextProvider>
);

ReactDOM.render(App, document.getElementById('root'));
