import React from 'react';
import ReactDom from 'react-dom';

import App from './App';
import {Provider} from 'react-redux';

import PersistedStore from "./utilites/PersistedStore";


import 'materialize-css/dist/css/materialize.min.css';
import './index.css'

ReactDom.render(
  <Provider store={PersistedStore.getDefaultStore().store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);