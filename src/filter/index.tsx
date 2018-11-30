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

class Filter extends React.Component<any, any> {

  render() {
    const { value , keyname } = this.props;
    return(
      <Lens filter={keyname}>{!!value ? value.toString() : '-' }</Lens>
    );
  };
}

export default Filter;
