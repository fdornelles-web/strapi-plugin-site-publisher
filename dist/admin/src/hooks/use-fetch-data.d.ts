/**
 * Module dependencies.
 */
/// <reference types="react" />
import { Error } from '../types/error';
/**
 * Export `useFetchData` hook.
 */
export declare function useFetchData(url: string): {
    error: Error | null;
    fetchedData: any;
    isLoading: boolean;
    setRefetch: import("react").Dispatch<import("react").SetStateAction<{}>>;
};
