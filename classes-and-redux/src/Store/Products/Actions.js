import { ProductsDataService } from "../../Services/ProductsData.service"

import { productActionTypes } from "./ActionTypes"
import { showSpinnerOverlayAction, hideSpinnerOverlayAction } from "../SpinnerOverlay";

export const getProducts = () => {
    return async dispatch => {
        dispatch(showSpinnerOverlayAction('Getting products...'));
        const products = await ProductsDataService.get();
        dispatch(getProductsAction(products));
        dispatch(hideSpinnerOverlayAction());
    };
};

export const addProduct = product => {
    return async dispatch => {
        const newProduct = await ProductsDataService.addOrEdit(product);
        dispatch(addProductAction({ ...product, id: newProduct.id }));
    };
};

export const editProduct = product => {
    return async dispatch => {
        dispatch(showSpinnerOverlayAction('Editing product...'));
        try {
            await ProductsDataService.addOrEdit(product);
            dispatch(editProductAction(product));
        } catch (e) {
            throw e;
        } finally {
            dispatch(hideSpinnerOverlayAction());
        }
    };
};

export const deleteProduct = id => {
    return async dispatch => {
        await ProductsDataService.delete(id);
        dispatch(deleteProductAction(id));
    };
};

export const applyFilter = filter => ({
    type: productActionTypes.applyFilter,
    payload: filter
});

export const applySorting = sortOptions => ({
    type: productActionTypes.applySorting,
    payload: sortOptions
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