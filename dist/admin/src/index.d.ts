/**
 * Module dependencies.
 */
/**
 * Export site publisher.
 */
declare const _default: {
    /**
     * Register.
     */
    register(app: any): void;
    /**
     * Bootstrap.
     */
    bootstrap(): void;
    /**
     * Register trads.
     */
    registerTrads({ locales }: {
        locales: string[];
    }): Promise<({
        data: {
            [x: string]: string;
        };
        locale: string;
    } | {
        data: {};
        locale: string;
    })[]>;
};
export default _default;
