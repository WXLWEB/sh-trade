import * as React from 'react';
import Lens from 'react-lens';
import './ordertype.tsx';
import './orderside.tsx';
import './timestamp.tsx';
import './countdown.tsx';
import './price.tsx';
import './orderstatus.tsx';
import './positions.tsx';
import './profit.tsx';
import './size.tsx';
import './thead.tsx';
import './feeCoin.tsx';
import './feeCNY.tsx';
import './shorttime.tsx';
import './email.tsx';
import './mobile.tsx';
import './decimal.tsx';

export interface FilterProps{
  value: any;
  keyname: string;
  decimal?: number;
}

class Filter extends React.Component<FilterProps, any> {

  render() {
    const { value , keyname, decimal } = this.props;
    return(
      <Lens filter={keyname ==='decimal' ? `${keyname}: ${decimal}` : keyname}>{!!value ? value.toString() : '0' }</Lens>
    );
  };
}

export default Filter;
