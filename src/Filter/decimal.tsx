import { make } from 'react-lens';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import { accFloor } from '@/utils/calculate';

make('decimal', 'string', (content: string, decimal: string) => {
  if ( content !== '-') {
    return <FormattedNumber value={accFloor(Number(content), decimal)} minimumFractionDigits={Number(decimal)} maximumFractionDigits={Number(decimal)}/>;
  }else {
    return '-';
  }

});
