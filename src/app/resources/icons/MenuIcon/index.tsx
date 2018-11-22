/* @jsx */

import * as React from 'react';
import './style.less';

class MenuIcon extends React.Component<any, any> {
  render() {
    const { onClick, isMenuOpen } = this.props;
    return (
      <div onClick={onClick} className={`menuIcon ${isMenuOpen ? 'isOpen' : ''}`}>
        <span />
      </div>
    );
  }
};

export default MenuIcon;
