/**
 * Module dependencies.
 */
import { Core } from '@strapi/strapi';
/**
 * Export `config`.
 */
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    config(): Promise<unknown>;
};
export default _default;
