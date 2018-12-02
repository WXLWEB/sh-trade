import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ConnectedIntlProvider from '@/components/ConnectedIntlProvider/index';
export interface FeedbackProps{
  readonly id: string;
}
export type FeedbackState = Readonly<any>;

class FeedbackText extends React.Component<FeedbackProps, FeedbackState>{
  public render(){
    const { id } = this.props;
    return(
        <ConnectedIntlProvider>
          <FormattedMessage id={id}/>
        </ConnectedIntlProvider>
    )
  }
}

export default FeedbackText;
