import * as React from 'react';
import './index.less';
class Box extends React.Component{
  public render(){
    const { children } = this.props;
    return(
      <div className="box">
        <div className="title">
        </div>
        <div className="content">

        </div>
      </div>
    )
  }
}
