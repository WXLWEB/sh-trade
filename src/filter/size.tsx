import { make } from 'react-lens';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

make('size', 'string', (content: string) => {
  if ( content !== '-') {
    return <FormattedNumber value={content} minimumFractionDigits={4} maximumFractionDigits={4} />;
  }else {
    return '-';
  }
});
