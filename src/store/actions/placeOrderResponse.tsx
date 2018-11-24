import { createAction } from 'redux-actions';

export const placeOrderResponse = createAction('place order response');
export const resetFeedbackTips = createAction('reset feedback tips');
export const resetFeedbackBack = createAction('reset feedback back');
export const setErrorToTrue = createAction('set error to true');
export const setErrorToFalse = createAction('set error to false');
