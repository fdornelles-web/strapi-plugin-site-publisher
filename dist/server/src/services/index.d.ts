/**
 * Module dependencies.
 */
/**
 * Export `services`.
 */
declare const _default: {
    config: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        config(): Promise<unknown>;
    };
    githubActions: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        inProgressCheck(): Promise<any>;
        trigger(): Promise<any>;
        history(): Promise<any>;
        logs(jobId: number): Promise<any>;
    };
};
export default _default;
