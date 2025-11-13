/**
 * Module dependencies.
 */
import React from 'react';
/**
 * `Props` type.
 */
type Props = {
    ariaLabel: string;
    disabled?: boolean;
    hint?: string;
    label: string;
    name: string;
    required?: boolean;
    value: string;
};
/**
 * Export `TextField` component.
 */
export declare function TextField(props: Props): React.JSX.Element;
export {};
