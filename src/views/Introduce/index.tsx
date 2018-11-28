import * as React from 'react';
import Box from '@/components/Box';
import './index.less';
interface IntroduceProps {

}
export type IntroduceState = Readonly<any>;

export default class Introduce extends React.Component<IntroduceProps, IntroduceState>{
  public render(){
    return(
      <div className="introduce">
        <Box
          title="币种介绍">
          btc
        </Box>
      </div>
    )
  }
}
