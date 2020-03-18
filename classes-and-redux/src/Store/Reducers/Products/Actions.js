import { ProductsDataService } from "../../../Services/ProductsData.service"

import { productActionTypes } from "./ActionTypes"

export const getProducts = () => {
    return dispatch => {
        ProductsDataService.get()
            .then(x => dispatch(getProductsAction(x)));
    }
}

const getProductsAction = products => ({
    type: productActionTypes.getAll,
    payload: products
});