
/**
 * Module dependencies.
 */

import { StyledAlert } from './toast-message.style';
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

export function ToastMessage(props: Props): React.JSX.Element {
  const { action, message, onClose, title, variant } = props;

  return (
    <StyledAlert
      action={action}
      closeLabel={'Close alert'}
      onClose={onClose}
      title={title}
      variant={variant}
    >
      {message}
    </StyledAlert>
  );
}
