/**
 * Module dependencies.
 */
import React, { ReactNode } from 'react';
/**
 * Export `ToastProps` type.
 */
export type ToastProps = {
    action?: ReactNode;
    message: string | null;
    title: string | null;
    variant: 'danger' | 'default' | 'success';
};
/**
 * `Props` type.
 */
type Props = ToastProps & {
    onClose: () => void;
};
/**
 * Export `ToastMessage` component.
 */
export declare function ToastMessage(props: Props): React.JSX.Element;
export {};
