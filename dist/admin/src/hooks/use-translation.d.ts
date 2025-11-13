/**
 * Module dependencies.
 */
/**
 * `Interpolations` type.
 */
type Interpolations = {
    [key: string]: string;
};
/**
 * Export `useTranslation` hook.
 */
export declare function useTranslation(labelId: string, interpolations?: Interpolations): string;
export {};
