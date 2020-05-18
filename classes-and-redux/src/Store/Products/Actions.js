import { ProductsDataService } from "../../Services/ProductsData.service"

import { productActionTypes } from "./ActionTypes"

export const getProducts = () => {
    return async dispatch => {
        const products = await ProductsDataService.get();
        dispatch(getProductsAction(products));
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
        await ProductsDataService.addOrEdit(product);
        dispatch(editProductAction(product));
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