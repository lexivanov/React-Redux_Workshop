import React from 'react';

import { modalActionTypes } from "./ActionTypes"
import { AddOrEditModal, ConfirmModal } from "../../Components/Forms";
import { deleteProduct } from '../Products';

export const showArrOrEditModal = product => dispatch => dispatch(showModalAction({
    element: <AddOrEditModal product={product} />
}));

export const showDeleteConfirmModal = product => dispatch => dispatch(showModalAction({
    element: <ConfirmModal
        title={`Delete ${product.name}`}
        question='Are you sure you want to delete this product?'
        onConfirm={async () => {
            await dispatch(deleteProduct(product.id));
            dispatch(hideModalAction());
        }}
        onReject={() => dispatch(hideModalAction())}
    />
}));

export const hideModalActionCreator = () => dispatch => dispatch(hideModalAction());

const showModalAction = modalData => ({
    type: modalActionTypes.show,
    payload: modalData
});

export const hideModalAction = () => ({
    type: modalActionTypes.hide
});