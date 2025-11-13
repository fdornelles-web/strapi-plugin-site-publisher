
/**
 * Module dependencies.
 */

import { pluginId } from '../utils/plugin-id';

/**
 * Export `routes`.
 */

export const routes = [{
  config: {
    policies: [
      'admin::isAuthenticatedAdmin',
      {
        name: 'admin::hasPermissions',
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: 'sitePublisher.inProgressCheck',
  method: 'GET',
  path: '/github-actions-check'
}, {
  config: {
    policies: [
      'admin::isAuthenticatedAdmin',
      {
        name: 'admin::hasPermissions',
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: 'sitePublisher.history',
  method: 'GET',
  path: '/github-actions-history'
}, {
  config: {
    policies: [
      'admin::isAuthenticatedAdmin',
      {
        name: 'admin::hasPermissions',
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: 'sitePublisher.logs',
  method: 'GET',
  path: '/github-actions-logs'
}, {
  config: {
    policies: [
      'admin::isAuthenticatedAdmin',
      {
        name: 'admin::hasPermissions',
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: 'sitePublisher.trigger',
  method: 'POST',
  path: '/github-actions-trigger'
}, {
  config: {
    policies: [
      'admin::isAuthenticatedAdmin',
      {
        name: 'admin::hasPermissions',
        config: {
          actions: [`plugin::${pluginId}.settings`]
        }
      }
    ]
  },
  handler: 'sitePublisher.config',
  method: 'GET',
  path: '/config'
}];
