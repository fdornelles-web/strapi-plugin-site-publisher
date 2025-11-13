/**
 * Module dependencies.
 */
import { ToastProps } from '../toast-message/toast-message';
import React, { Dispatch, SetStateAction } from 'react';
/**
 * `Props` type.
 */
type Props = {
    createdAt: string;
    environment: string;
    htmlUrl: string;
    id: number;
    name: string;
    runNumber: number;
    setToastMessage: Dispatch<SetStateAction<ToastProps>>;
    setToastToggle: Dispatch<SetStateAction<boolean>>;
    startedAt: string;
    status: 'failure' | 'success' | null;
    updatedAt: string;
};
/**
 * Export `CustomRow` component.
 */
export declare function CustomRow(props: Props): React.JSX.Element;
export {};
