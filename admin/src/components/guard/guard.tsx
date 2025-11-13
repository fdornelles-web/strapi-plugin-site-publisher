
/**
 * Module dependencies.
 */

import { EmptyStateLayout, LinkButton } from '@strapi/design-system';
import { Error } from '../../types/error';
import { NavLink } from 'react-router-dom';
import { WarningCircle } from '@strapi/icons';
import { pluginId } from '../../utils/plugin-id';
import { useTranslation } from '../../hooks/use-translation';
import React, { ReactNode } from 'react';

/**
 * Icon size.
 */

const iconSize = 100;

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

export function Guard({ children, error }: Props): React.JSX.Element | null {
  switch (error?.status) {
    case 403:
    case 401:
      return (
        <EmptyStateLayout
          content={useTranslation('permission.guard')}
          icon={
            <WarningCircle
              height={iconSize}
              width={iconSize}
            />
          }
        />
      );

    case 404:
      return (
        <EmptyStateLayout
          action={
            <LinkButton
              style={{ 'text-decoration': 'none' }}
              tag={NavLink}
              to={`/settings/${pluginId}`}
            >
              {useTranslation('button.configuration')}
            </LinkButton>
          }
          content={useTranslation('permission.notFound')}
          icon={
            <WarningCircle
              height={iconSize}
              width={iconSize}
            />
          }
        />
      );
  }

  return children ? (
    <>
      {children}
    </> 
  ) : null;
}
