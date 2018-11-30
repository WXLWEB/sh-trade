import { make } from 'react-lens';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

make('orderstatus', 'string', (content, order) => {
  const data;
  switch (content) {
    case '0':
      data = <FormattedMessage id='quantum_order_status_new'></FormattedMessage>;
      break;
    case '1':
      data =  <FormattedMessage id='quantum_order_status_partially_filled'></FormattedMessage>;
      break;
    case '2':
      data =  <FormattedMessage id='quantum_order_status_filled'></FormattedMessage>;
      break;
    case '3':
      data =  <FormattedMessage id='quantum_order_status_closed'></FormattedMessage>;
      break;
    case '4':
      data =  <FormattedMessage id='quantum_order_status_canceled'></FormattedMessage>;
      break;
    case 'G':
      data =  <FormattedMessage id='quantum_order_status_cancel_by_system'></FormattedMessage>;
      break;
    case 'S':
      data =  <FormattedMessage id='quantum_order_status_liquidated'></FormattedMessage>;
      break;
    case 'P': // pending Orders
      data =  <a>Cancel</a>;
      break;
    case '-':
      data = '-';
      break;
    default:
      data = '-';
      break;
  }
  return data;
});
