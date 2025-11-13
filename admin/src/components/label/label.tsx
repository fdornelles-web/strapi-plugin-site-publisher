
/**
 * Module dependencies.
 */

import { Badge } from '@strapi/design-system';
import React from 'react';

/**
 * `Props` type.
 */

type Props = {
  status: 'failure' | 'success';
};

/**
 * Export `Label` component.
 */

export function Label(props: Props): React.JSX.Element {
  const { status } = props;

  return (
    <Badge
      backgroundColor={status === 'success' ? 'success600' : 'danger600'}
      textColor={'neutral100'}
    >
      {status}
    </Badge>
  );
}
