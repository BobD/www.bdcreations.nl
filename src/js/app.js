import 'babel-polyfill';
import Test from './modules/test';

console.log('env', process.env.NODE_ENV);

new Test();