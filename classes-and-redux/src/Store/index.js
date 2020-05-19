import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import { products } from "./Products";
import { modals } from "./Modals";
import { spinnerOverlay } from "./SpinnerOverlay";

const reducers = combineReducers({ products, modals, spinnerOverlay });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));