import { make } from 'react-lens';

make('email', 'string', (content: string) => {
  console.log('email:', content);
  return `${content.split('@')[0].slice(0, 3)}***@${content.split('@')[1]}`;
});
