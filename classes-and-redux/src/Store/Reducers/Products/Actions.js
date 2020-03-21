import { ProductsDataService } from "../../../Services/ProductsData.service"

import { productActionTypes } from "./ActionTypes"

export const getProducts = () => {
    return dispatch => {
        ProductsDataService.get()
            .then(x => dispatch(getProductsAction(x)));
    };
};

export const addProduct = product => {
    return dispatch => {
        ProductsDataService.addOrEdit(product)
            .then(x => dispatch(addProductAction({ ...product, id: x.id })));
    };
};

export const editProduct = product => {
    return dispatch => {
        ProductsDataService.addOrEdit(product)
            .then(x => dispatch(editProductAction(product)));
    };
};

export const deleteProduct = id => {
    return dispatch => {
        ProductsDataService.addOrEdit(id)
            .then(x => dispatch(deleteProductAction(id)));
    };
};

export const applyFilter = filter => ({
    type: productActionTypes.applyFilter,
    payload: filter
});

const getProductsAction = products => ({
    type: productActionTypes.getAll,
    payload: products
});

const editProductAction = product => ({
    type: productActionTypes.edit,
    payload: product
});

const addProductAction = product => ({
    type: productActionTypes.add,
    payload: product
});

const deleteProductAction = id => ({
    type: productActionTypes.delete,
    payload: id
});