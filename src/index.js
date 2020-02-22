import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: "https://da391d7f8a61491c98727258861489e7@sentry.io/2769713"});

ReactDOM.render(<MainApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
