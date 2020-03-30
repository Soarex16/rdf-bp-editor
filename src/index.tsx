import React from 'react';
import ReactDOM from 'react-dom';
import {addStyles} from 'react-mathquill';
import Editor from './components/editor/Editor';

import './style.css';
import './assets/themes.scss';

// inject into <head> Mathquill styles
addStyles();

ReactDOM.render(<Editor/>, document.getElementById('root'));
