import { modalActionTypes } from "./ActionTypes"

export const showModalAction = modalData => ({
    type: modalActionTypes.show,
    payload: modalData
});

export const hideModalAction = () => ({
    type: modalActionTypes.hide
});