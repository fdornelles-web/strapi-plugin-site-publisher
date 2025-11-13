/**
 * Module dependencies.
 */
import { Core } from '@strapi/strapi';
/**
 * Export `githubActions`.
 */
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    inProgressCheck(): Promise<any>;
    trigger(): Promise<any>;
    history(): Promise<any>;
    logs(jobId: number): Promise<any>;
};
export default _default;
