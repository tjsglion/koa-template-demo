import _ from 'lodash';
import { join } from 'path';

let config = {
  staticDir: join(__dirname, './', 'assets'),
  viewDir: join(__dirname, './', 'views'),
  baseUrl: 'http://www.sdgswl.com',
  port: 3333
};

if ('development' === process.env.NODE_ENV) {
  const localConfig = {
    port: 3333,
    baseUrl: 'http://www.sdgswl.com'
  };
  config = _.extend(config, localConfig);
}

if ('production' === process.env.NODE_ENV) {
  const localConfig = {
    port: 80,
    baseUrl: 'http://www.sdgswl.com'
  };
  config = _.extend(config, localConfig);
}

export default config;
