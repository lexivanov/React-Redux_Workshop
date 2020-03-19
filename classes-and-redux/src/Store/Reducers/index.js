import { combineReducers } from "redux";
import { products } from "./Products";
import { modals } from "./Modals";

export const reducers = combineReducers({ products, modals });