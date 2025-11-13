/**
 * Module dependencies.
 */
import { Error } from '../../types/error';
import React, { ReactNode } from 'react';
/**
 * `Props` type.
 */
type Props = {
    children?: ReactNode;
    error: Error | null;
};
/**
 * Export `Guard` component.
 */
export declare function Guard({ children, error }: Props): React.JSX.Element | null;
export {};
