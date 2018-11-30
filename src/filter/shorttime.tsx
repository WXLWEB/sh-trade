import { make } from 'react-lens';
import * as React from 'react';
import Time from 'react-time';

make('shorttime', 'string', (content) => {
  if (content === '-') {
    return '-';
  }
  return <Time value={new Date(Number(content))} format='HH:mm:ss'/>;
});
