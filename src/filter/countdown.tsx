import { make } from 'react-lens';

make('countdown', 'string', (content: string) => {
  if ( content !== '0') {
    const now = new Date().getTime();
    const endtime = new Date(Number(content)).getTime();
    const leaveTime = parseInt((endtime - now) / 1000);
    return leaveTime;
  }else {
    return '-';
  }

});
