import { make } from 'react-lens';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

make('price', 'string', (content: string) => {
  if ( content !== '-') {
    return <FormattedNumber value={Number(content)} minimumFractionDigits={4} maximumFractionDigits={4} />;
  }else {
    return '-';
  }

});
