import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

