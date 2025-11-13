
/**
 * Module dependencies.
 */

import { pluginId } from './utils/plugin-id';

/**
 * Permissions.
 */

const permissions = {
  settings: [{
    action: `plugin::${pluginId}.settings`,
    subject: null
  }],
  trigger: [{
    action: `plugin::${pluginId}.trigger`,
    subject: null
  }]
};

/**
 * Export `permissions`.
 */

export default permissions;
