
/**
 * Module dependencies.
 */

import { Layouts, Page } from '@strapi/strapi/admin';
import { Loader } from '@strapi/design-system';
import { ReactNode } from 'react';
import { StyledFlex } from './page-wrapper.styled';
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

export function PageWrapper(props: Props): React.JSX.Element {
  const { baseHeaderLayout, children, isLoading, pageTitle } = props;

  return (
    <>
      {pageTitle && (
        <Page.Title>
          {pageTitle}
        </Page.Title>
      )}

      {baseHeaderLayout}

      {isLoading ? (
        <StyledFlex>
          <Loader />
        </StyledFlex>
      ) : (
        <Layouts.Content>
          {children}
        </Layouts.Content>
      )}
    </>
  );
}
