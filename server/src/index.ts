
/**
 * Module dependencies.
 */

import { routes } from './routes';
import bootstrap from './bootstrap';
import config from './config';
import controllers from './controllers';
import destroy from './destroy';
import register from './register';
import services from './services';

/**
 * Export `server`.
 */

export default {
  bootstrap,
  config,
  controllers,
  destroy,
  register,
  routes,
  services
};
