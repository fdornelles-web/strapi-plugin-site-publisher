/**
 * Module dependencies.
 */
import { ReactNode } from 'react';
import React from 'react';
/**
 * `Props` type.
 */
type Props = {
    baseHeaderLayout?: ReactNode;
    children: any;
    isLoading: boolean;
    pageTitle?: string;
};
/**
 * Export `PageWrapper` component.
 */
export declare function PageWrapper(props: Props): React.JSX.Element;
export {};
