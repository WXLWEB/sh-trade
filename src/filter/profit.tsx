import { make } from 'react-lens';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

make('profit', 'string', (content: string) => {
  if ( content !== '-') {
    const str = <FormattedNumber value={Number(content)} minimumFractionDigits={2} maximumFractionDigits={2} />;
    return content > 0 ? <span className='green'>+{str}</span> : <span className='red'>{str}</span>;
  }else {
    return '-';
  }
});
