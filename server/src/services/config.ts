
/**
 * Module dependencies.
 */

import { Core } from '@strapi/strapi';
import { pluginId } from '../utils/plugin-id';

/**
 * Export `config`.
 */

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async config() {
    return strapi.config.get(`plugin::${pluginId}`);
  }
});
