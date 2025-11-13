
/**
 * Module dependencies.
 */

import { Core } from '@strapi/strapi';
import { pluginId } from '../utils/plugin-id';

/**s
 * Export `sitePublisher`.
 */

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async inProgressCheck(ctx) {
    const data = await strapi
      .plugin(pluginId)
      .service('githubActions')
      .inProgressCheck();

    ctx.body = { data };
  },

  async config(ctx) {
    const data = await strapi
      .plugin(pluginId)
      .service('config')
      .config();

    ctx.body = { data };
  },

  async history(ctx) {
    const data = await strapi
      .plugin(pluginId)
      .service('githubActions')
      .history();

    ctx.body = { data };
  },

  async logs(ctx) {
    const { jobId } = ctx.request.query;
    const data = await strapi
      .plugin(pluginId)
      .service('githubActions')
      .logs(jobId);

    ctx.body = { data };
  },

  async trigger(ctx) {
    const data = await strapi
      .plugin(pluginId)
      .service('githubActions')
      .trigger();
      
    ctx.body = { data };
  }
});
