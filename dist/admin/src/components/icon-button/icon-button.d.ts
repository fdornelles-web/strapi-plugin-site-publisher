/**
 * Module dependencies.
 */
/// <reference types="react" />
/**
 * `Props` type.
 */
type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    label?: string;
    onClick?: () => void;
    variant?: string;
};
/**
 * Export `IconButton` component.
 */
export declare function IconButton(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
