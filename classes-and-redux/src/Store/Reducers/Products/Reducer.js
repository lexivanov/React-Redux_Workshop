import { productActionTypes } from "./ActionTypes";

const initialState = {
    list: new Map(),
    ids: [],
    filter: ''
};

const reducerMapping = {
    [productActionTypes.getAll]: (state, products) => {
        const list = new Map();
        products.forEach(prod => list.set(prod.id, prod));

        return {
            ...state,
            list,
            ids: products.map(x => x.id)
        };
    },

    [productActionTypes.add]: (state, product) => {
        const list = new Map(state.list);
        list.set(product.id, product);

        return {
            ...state,
            list,
            ids: [...state.ids, product.id]
        };
    },

    [productActionTypes.edit]: (state, product) => {
        const list = new Map(state.list);
        list.set(product.id, product);
        return { ...state, list };
    },

    [productActionTypes.delete]: (state, id) => {
        const list = new Map(state.list);
        list.delete(id);
        return {
            ...state,
            list,
            ids: state.ids.filter(x => x !== id)
        };
    },

    [productActionTypes.applyFilter]: (state, filter) => ({ ...state, filter }),
}

export const products = (state = initialState, action) => reducerMapping[action.type] ? reducerMapping[action.type](state, action.payload) : state;