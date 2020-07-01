import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const appContainerElement = document.createElement('div');
appContainerElement.id = 'gcal-command-window';
document.body.appendChild(appContainerElement);

// i removed strict mode because in production,
// it doesn't render or update the list of actions because of this??
// not entirely sure why. it's supposed to affect development only
ReactDOM.render(
  <App/>,
  appContainerElement
);


