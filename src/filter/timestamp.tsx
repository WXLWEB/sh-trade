import { make } from 'react-lens';
import * as React from 'react';
import Time from 'react-time';

make('timestamp', 'string', (content: string) => {
  if (content === '-') {
    return '-';
  }
  return <Time value={new Date(Number(content))} format='HH:mm:ss'/>;
});
