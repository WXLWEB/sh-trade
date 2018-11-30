import { make } from 'react-lens';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

make('price', 'string', (content) => {
  if ( content !== '-') {
    return <FormattedNumber value={Number(content)} minimumFractionDigits={2} maximumFractionDigits={2} />;
  }else {
    return '-';
  }

});
