import { createAction } from 'redux-actions';

export const orderPendingOrders = createAction('order pending orders');
export const orderClosedOrders = createAction('order closed orders');
export const orderPositionOrders = createAction('order position orders');
