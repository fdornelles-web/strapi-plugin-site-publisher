/**
 * `Inputs` type.
 */
type Inputs = {
    [key: string]: string;
};
/**
 * Export `Config` type.
 */
export type Config = {
    branch: string;
    githubToken: string;
    inputs?: Inputs;
    owner: string;
    repo: string;
    workflowId: string;
};
export {};
