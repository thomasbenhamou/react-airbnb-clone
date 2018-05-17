// importing React
import React from 'react';
import ReactDOM from 'react-dom';
// importing the linked csss
import './index.css';
// importing the App which is the main container for all other components : flat, marker
import App from './App';
// a background worker, may allow for caching of data
import registerServiceWorker from './registerServiceWorker';
// the main render which renders the App within the main HTML div named "Root"
// see ../../pulic/index.html to find the root div
ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();
