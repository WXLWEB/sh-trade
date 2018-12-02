import { make } from 'react-lens';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

make('ordertype', 'string', (content: string) => {
  const data;
  switch (content) {
    case 'X':
      data = <FormattedMessage id='quantum_order_type_deal'></FormattedMessage>;
      break;
    case '2':
      data =  <FormattedMessage id='quantum_order_type_limit'></FormattedMessage>;
      break;
    case '1':
      data =  <FormattedMessage id='quantum_order_type_market'></FormattedMessage>;
      break;
    case '3':
      data =  <FormattedMessage id='quantum_order_type_stop'></FormattedMessage>;
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
