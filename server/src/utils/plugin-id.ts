
/**
 * Module dependencies.
 */

import pluginPkg from '../../../package.json';

/**
 * Export `pluginId`.
 */

export const pluginId = pluginPkg.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');
