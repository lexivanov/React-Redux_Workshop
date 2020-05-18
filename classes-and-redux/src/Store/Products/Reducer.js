import { productActionTypes } from "./ActionTypes";

const initialState = {
    list: Object.create(null),
    ids: [],
    filter: '',
    sortOptions: {
        field: "name",
        isDesc: false
    }
};

const reducerMapping = {
    [productActionTypes.getAll]: (state, products) => {
        const list = Object.create(null);
        products.forEach(prod => list[prod.id] = prod);

        return {
            ...state,
            list,
            ids: products.map(x => x.id)
        };
    },

    [productActionTypes.add]: (state, product) => {
        const list = { ...state.list };
        list[product.id] = product;

        return {
            ...state,
            list,
            ids: [...state.ids, product.id]
        };
    },

    [productActionTypes.edit]: (state, product) => {
        const list = { ...state.list };
        list[product.id] = product;
        return { ...state, list };
    },

    [productActionTypes.delete]: (state, id) => {
        const list = { ...state.list };
        list[id] = undefined;
        return {
            ...state,
            list,
            ids: state.ids.filter(x => x !== id)
        };
    },

    [productActionTypes.applyFilter]: (state, filter) => ({ ...state, filter }),

    [productActionTypes.applySorting]: (state, sortOptions) => ({ ...state, sortOptions }),
}

export const products = (state = initialState, action) => reducerMapping[action.type] ? reducerMapping[action.type](state, action.payload) : state;