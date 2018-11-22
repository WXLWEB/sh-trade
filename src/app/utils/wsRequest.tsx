import wsSignature from './wsSignature';

const moment = require('moment');

const createRequest = (type) => {
  return {
    MsgType: type,
    CRID: wsSignature.getUniqueID(),
  };
};

const createSignedRequest = (type) => {
  const request = createRequest(type);
  const date = new Date();
  request.Date = moment(date).format('YYYYMMDD'); // 20160520
  request.Account = spotAccountID;
  return request;
};

const signedRequest = (request, fields) => {
  const headers = [request.MsgType, request.CRID, request.Date, request.Account];
  const concatArray = [];
  if (fields) {
    concatArray = headers.concat(fields);
  }else {
    concatArray = headers;
  };
  const joinStr = concatArray.join('');
  request.SIG = wsSignature.getSignature(joinStr);
  return request;
};

const createGetTradesRequest = (symbol, count) => {
  const request = createRequest('GetTradesRequest');
  request.Count = count;
  request.Symbol = symbol;
  return JSON.stringify(request);
};

const createQuoteRequest = (symbol, type) => {
  const request = createRequest('QuoteRequest');
  request.Symbol = symbol;
  request.QuoteType = type;
  return JSON.stringify(request);
};

const createGetOrdersRequest = (symbol, begin, end, status) => {
  const request = createSignedRequest('GetOrdersRequest');
  request.Symbol = symbol;
  request.Status = status;
  request.Begin = begin;
  request.End = end;
  signedRequest(request, [symbol, begin, end, status]);
  return JSON.stringify(request);
};

const createLoginRequest = () => {
  const request = createSignedRequest('LoginRequest');
  signedRequest(request);
  return JSON.stringify(request);
};

const createLogoutRequest = () => {
  const request = createSignedRequest('LogoutRequest');
  signedRequest(request);
  return JSON.stringify(request);
};

const createGetAccountInfoRequest = () => {
  const request = createSignedRequest('GetAccountInfoRequest');
  signedRequest(request);
  return JSON.stringify(request);
};

const createSubscribeRequest = () => {
  const request = createSignedRequest('SubscribeRequest');
  signedRequest(request);
  return JSON.stringify(request);
};

const createUnsubscribeRequest = () => {
  const request = createSignedRequest('UnsubscribeRequest');
  signedRequest(request);
  return JSON.stringify(request);
};

const createPlaceOrderRequest = (symbol, side, orderType, quantity, price, stopPrice) => {
  const request = createSignedRequest('PlaceOrderRequest');
  request.Symbol = symbol;
  request.Side = side;
  request.OrderType = orderType;
  request.Quantity = quantity;
  request.Price = price;
  request.StopPrice = stopPrice;
  signedRequest(request, [symbol, side, orderType, quantity, price, stopPrice]);
  return JSON.stringify(request);
};

const createCancelOrderRequest = (symbol, OID) => {
  const request = createSignedRequest('CancelOrderRequest');
  request.Symbol = symbol;
  request.OID = OID;
  signedRequest(request, [symbol, OID]);
  return JSON.stringify(request);
};

const createCancelReplaceOrderRequest = (symbol, OID, quantity, price, stopPrice, oldQuantity) => {
  const request = createSignedRequest('CancelReplaceOrderRequest');
  request.Symbol = symbol;
  request.OID = OID;
  request.Quantity = quantity;
  request.OldQuantity = oldQuantity;
  request.Price = price;
  request.StopPrice = stopPrice;
  signedRequest(request, [symbol, OID, quantity, price, stopPrice, oldQuantity]);
  return JSON.stringify(request);
};

const createRetrieveTransactionsRequest = (symbol, Start, End, Filter, PageIndex, RecCountsPerPage) => {
  const request = createSignedRequest('RetrieveTransactionsRequest');
  request.Symbol = symbol;
  request.Start = Start;
  request.End = End;
  request.Filter = Filter;
  request.PageIndex = PageIndex;
  request.RecCountsPerPage = RecCountsPerPage;
  signedRequest(request, [symbol, Start, End, Filter, PageIndex, RecCountsPerPage]);
  return JSON.stringify(request);
};

const createAllOrdersRequest = (Symbol, Side, HighPrice, LowPrice) => {
  const request = createSignedRequest('CancelAllOrdersRequest');
  request.Symbol = Symbol;
  request.Side = Side;
  request.HighPrice = HighPrice;
  request.LowPrice = LowPrice;
  signedRequest(request, [Symbol, Side, HighPrice, LowPrice]);
  return JSON.stringify(request);
};

const createGetActiveContractsRequest = () => {
  const request = createRequest('GetActiveContractsRequest');
  return JSON.stringify(request);
};

const createQueryDealQuoteRequest = (Symbol, Side) => {
  const request = createSignedRequest('QueryDealQuoteRequest');
  request.Symbol = Symbol;
  request.Side = Side;
  signedRequest(request, [Symbol, Side]);
  return JSON.stringify(request);
};

const createExecuteDealQuoteRequest = (Symbol, Quantity) => {
  const request = createSignedRequest('ExecuteDealQuoteRequest');
  request.Symbol = Symbol;
  request.Quantity = Quantity;
  signedRequest(request, [Symbol, Quantity]);
  return JSON.stringify(request);
};

export default {
  createGetTradesRequest,
  createQuoteRequest,
  createGetOrdersRequest,
  createLoginRequest,
  createLogoutRequest,
  createGetAccountInfoRequest,
  createSubscribeRequest,
  createUnsubscribeRequest,
  createPlaceOrderRequest,
  createCancelOrderRequest,
  createCancelReplaceOrderRequest,
  createRetrieveTransactionsRequest,
  createAllOrdersRequest,
  createGetActiveContractsRequest,
  createQueryDealQuoteRequest,
  createExecuteDealQuoteRequest,
};
