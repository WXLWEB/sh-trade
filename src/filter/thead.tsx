import { make } from 'react-lens';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

make('thead', 'string', (content) => {
  const data;
  switch (content) {
    case 'Time':
      data = <FormattedMessage id='prog_order_panel_time'></FormattedMessage>;
      break;
    case 'ShortTime':
      data = <FormattedMessage id='prog_order_panel_time'></FormattedMessage>;
      break;
    case 'Symbol':
      data = <FormattedMessage id='prog_order_panel_symbol'></FormattedMessage>;
      break;
    case 'LeaveQty':
      data =  <FormattedMessage id='prog_order_panel_leaave_qty'></FormattedMessage>;
      break;
    case 'CumQty':
      data =  <FormattedMessage id='prog_order_panel_cum_qty'></FormattedMessage>;
      break;
    case 'Total':
      data =  <FormattedMessage id='prog_order_panel_total'></FormattedMessage>;
      break;
    case 'Price':
      data =  <FormattedMessage id='prog_order_panel_price'></FormattedMessage>;
      break;
    case 'Type':
      data =  <FormattedMessage id='prog_order_panel_type'></FormattedMessage>;
      break;
    case 'Side':
      data =  <FormattedMessage id='prog_order_panel_side'></FormattedMessage>;
      break;
    case 'Status':
      data =  <FormattedMessage id='prog_order_panel_status'></FormattedMessage>;
      break;
    case 'Positions':
      data =  <FormattedMessage id='prog_order_panel_size'></FormattedMessage>;
      break;
    case 'Profit':
      data =  <FormattedMessage id='prog_order_panel_profit'></FormattedMessage>;
      break;
    case 'Avg.Price':
      data =  <FormattedMessage id='prog_order_panel_avg'></FormattedMessage>;
      break;
    case 'Cancel':
      data =  <FormattedMessage id='prog_order_panel_cancel'></FormattedMessage>;
      break;
    case 'Replace':
      data =  <FormattedMessage id='prog_order_panel_replace'></FormattedMessage>;
      break;
    case 'Save':
      data =  <FormattedMessage id='prog_order_panel_replace_save'></FormattedMessage>;
      break;
    case 'Profit':
      data =  <FormattedMessage id='prog_order_panel_profit'></FormattedMessage>;
      break;
    case 'Quantity':
      data = <FormattedMessage id='quantum_text_quantity'></FormattedMessage>;
      break;
    case 'Maker':
      data = <FormattedMessage id='prog_order_panel_maker'></FormattedMessage>;
      break;
    case 'Taker':
      data = <FormattedMessage id='prog_order_panel_taker'></FormattedMessage>;
      break;
    case '-':
      data = '-';
      break;
    default:
      data = content;
      break;
  }
  return data;
});
