import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './container/index.js';
// import store from '../../redux/src/containers/store/declare';
// import {Store} from './container/store/index';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
  // {/* </React.StrictMode>, */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// C:\Users\Computing Yard-01\Documents\Dilawer Aziz\projects\firebase-auth\src\redux\index.js