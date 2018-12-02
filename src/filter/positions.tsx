import { make } from 'react-lens';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

make('positions', 'string', (content: string) => {
  if ( content !== '-') {
    const str = <FormattedNumber value={Math.floor(Number(content))}  minimumFractionDigits={0} maximumFractionDigits={0} />;
    return Math.floor(Number(content)) > 0 ? <span className='green'>+{str}</span> : <span className='red'>{str}</span>;
  }else {
    return '-';
  }

});
