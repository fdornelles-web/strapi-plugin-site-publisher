/**
 * Module dependencies.
 */
/**
 * Export `controllers`.
 */
declare const _default: {
    sitePublisher: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        inProgressCheck(ctx: any): Promise<void>;
        config(ctx: any): Promise<void>;
        history(ctx: any): Promise<void>;
        logs(ctx: any): Promise<void>;
        trigger(ctx: any): Promise<void>;
    };
};
export default _default;
