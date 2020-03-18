import { productActionTypes } from "./ActionTypes";

const initialState = {
    list: [],
    ids: []
};

const reducerMapping = {
    [productActionTypes.getAll]: (state, products) => ({
        ...state,
        list: products,
        ids: products.map(x => x.id)
    }),

    [productActionTypes.add]: (state, product) => ({
        ...state,
        list: [...state.list, product],
        ids: [...state.ids, product.id]
    }),

    [productActionTypes.edit]: (state, product) => {
        const list = [...state.list];
        const editedIndex = list.findIndex(x => x.id === product.id);
        list[editedIndex] = product;
        return { ...state, list };
    },

    [productActionTypes.delete]: (state, id) => ({
        ...state,
        list: state.list.filter(x => x.id !== id),
        ids: state.ids.filter(x => x !== id)
    }),
}

export const products = (state = initialState, action) => reducerMapping[action.type] ? reducerMapping[action.type](state, action.payload) : state;