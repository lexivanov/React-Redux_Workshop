import { spinnerOverlayActionTypes } from "./ActionTypes";

export const showSpinnerOverlayAction = text => ({
  type: spinnerOverlayActionTypes.show,
  payload: text
});

export const hideSpinnerOverlayAction = () => ({
  type: spinnerOverlayActionTypes.hide,
});