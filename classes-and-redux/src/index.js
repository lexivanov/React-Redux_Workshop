import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ProductsTable } from './App';
import { store } from './Store';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <ProductsTable />
    </Provider>,
    document.getElementById('root')
);

