import { spinnerOverlayActionTypes } from "./ActionTypes";

const initialState = {
  text: undefined
};

const reducerMapping = {
  [spinnerOverlayActionTypes.show]: (state, text) => {
    return { ...state, text };
  },

  [spinnerOverlayActionTypes.hide]: (state) => {
    return { ...state, text: undefined };
  }
}

export const spinnerOverlay = (state = initialState, action) => reducerMapping[action.type] ? reducerMapping[action.type](state, action.payload) : state;