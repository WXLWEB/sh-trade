import { make } from 'react-lens';
import * as React from 'react';
import { accFloor } from '@/utils/calculate';
import { FormattedNumber } from 'react-intl';

make('feeCNY', 'string', (content: string) => {
  if ( content !== '-') {
    return content > 0 ?
    <span>+<FormattedNumber value={accFloor(Number(content), 2)} minimumFractionDigits={2} maximumFractionDigits={2} /></span>
    :
    <FormattedNumber value={Number(content)} minimumFractionDigits={2} maximumFractionDigits={2} />
    ;
  }else {
    return '-';
  }
});
