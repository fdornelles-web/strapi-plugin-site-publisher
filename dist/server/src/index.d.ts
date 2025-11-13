/**
 * Module dependencies.
 */
/**
 * Export `server`.
 */
declare const _default: {
    bootstrap: ({ strapi }: {
        strapi: any;
    }) => Promise<void>;
    config: {
        default: {};
        validator({ owner, repo, branch, workflowId, githubToken, inputs }: {
            owner: any;
            repo: any;
            branch: any;
            workflowId: any;
            githubToken: any;
            inputs: any;
        }): void;
    };
    controllers: {
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
    destroy: () => void;
    register: () => void;
    routes: {
        config: {
            policies: (string | {
                name: string;
                config: {
                    actions: string[];
                };
            })[];
        };
        handler: string;
        method: string;
        path: string;
    }[];
    services: {
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
};
export default _default;
