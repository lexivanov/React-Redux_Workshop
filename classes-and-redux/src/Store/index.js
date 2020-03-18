import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { reducers } from './Reducers';

export * from './Reducers/Products/ActionTypes';

export const store = createStore(reducers, applyMiddleware(thunk));