import { make } from 'react-lens';

make('mobile', 'string', (content) => {
  return content.replaceAll('(\\d{3})\\d{4}(\\d{4})', '$1****$2');
});
