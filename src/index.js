import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';
import { Provider } from 'react-redux';
import store from './redux/core/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
