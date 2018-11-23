import { createAction } from 'redux-actions';

export const updateBuyQuantity = createAction('update buy quantity');
export const updateSellQuantity = createAction('update sell quantity');
export const updateBuyPrice = createAction('update buy price');
export const updateSellPrice = createAction('update sell price');
export const updateBuyStopPrice = createAction('update buy stop price');
export const updateSellStopPrice = createAction('update sell stop price');
export const updateBuyTotal = createAction('update buy total');
export const updateSellTotal = createAction('update sell total');
export const clearPlaceOderInfo = createAction('clear place order info');
