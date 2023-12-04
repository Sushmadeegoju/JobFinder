import React from 'react';
import { createRoot } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './components/serviceWorker';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();