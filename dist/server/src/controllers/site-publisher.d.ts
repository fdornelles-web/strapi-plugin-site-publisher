/**
 * Module dependencies.
 */
import { Core } from '@strapi/strapi';
/**s
 * Export `sitePublisher`.
 */
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    inProgressCheck(ctx: any): Promise<void>;
    config(ctx: any): Promise<void>;
    history(ctx: any): Promise<void>;
    logs(ctx: any): Promise<void>;
    trigger(ctx: any): Promise<void>;
};
export default _default;
