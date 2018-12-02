import { make } from 'react-lens';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

make('orderside', 'string', (content: string) => {
  const data;
  switch (content) {
    case '1':
      data = <span className='green'><FormattedMessage id='quantum_button_buy'></FormattedMessage></span>;
      break;
    case '2':
      data = <span className='red'><FormattedMessage id='quantum_button_sell'></FormattedMessage></span>;
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
