import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const appContainerElement = document.createElement('div');
appContainerElement.id = 'gcal-command-window';
document.body.appendChild(appContainerElement);

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  ,
  appContainerElement
);


