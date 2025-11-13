
/**
 * Module dependencies.
 */

import { pluginId } from './utils/plugin-id';

/**
 * Export `bootstrap`.
 */

export default async ({ strapi }) => {
  const actions = [{
    displayName: 'Trigger builds',
    pluginName: pluginId,
    section: 'plugins',
    subCategory: 'general',
    uid: 'trigger'
  }, {
    category: 'website deploy',
    displayName: 'Access settings',
    pluginName: pluginId,
    section: 'settings',
    uid: 'settings'
  }];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
