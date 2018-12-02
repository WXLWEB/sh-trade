import { make } from 'react-lens';

make('mobile', 'string', (content: string) => {
  return content.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
});
