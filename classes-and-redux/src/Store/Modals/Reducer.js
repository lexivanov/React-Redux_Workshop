import { modalActionTypes } from "./ActionTypes";

const initialState = {
    list: []
};

const reducerMapping = {
    [modalActionTypes.show]: (state, modal) => {
        const list = [...state.list];
        list.push(modal);

        return {
            ...state,
            list,
        };
    },

    [modalActionTypes.hide]: (state) => {
        const list = [...state.list];
        list.pop();

        return {
            ...state,
            list,
        };
    },
}

export const modals = (state = initialState, action) => reducerMapping[action.type] ? reducerMapping[action.type](state, action.payload) : state;