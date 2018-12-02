import { make } from 'react-lens';
import * as React from 'react';
import { accFloor } from '@/utils/calculate';
import { FormattedNumber } from 'react-intl';

make('feeCoin', 'string', (content: string) => {
  if ( content !== '-') {
    return Number(content) > 0 ?
    <span>+<FormattedNumber value={accFloor(Number(content), 4)} minimumFractionDigits={4} maximumFractionDigits={4} /></span>
    :
    <FormattedNumber value={Number(content)} minimumFractionDigits={4} maximumFractionDigits={4} />
    ;
  }else {
    return '-';
  }
});
