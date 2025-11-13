
/**
 * Module dependencies.
 */

import { Alert } from '@strapi/design-system';
import styled from 'styled-components';

/**
 * Export `StyledAlert` styled component.
 */

export const StyledAlert = styled(Alert)`
  left: calc(50%);
  position: fixed;
  top: 24px;
  transform: translateX(-50%);
  width: 350px;
  z-index: 10;
`;
