
/**
 * Module dependencies.
 */

import { pluginId } from './plugin-id';

/**
 * Export `getTranslation`.
 */

export function getTranslation(id: string): string {
  return `${pluginId}.${id}`;
}
