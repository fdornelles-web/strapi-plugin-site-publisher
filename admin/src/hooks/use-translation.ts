
/**
 * Module dependencies.
 */

import { getTranslation } from '../utils/get-translation';
import { isEmpty } from 'lodash';
import { useIntl } from 'react-intl';

/**
 * `Interpolations` type.
 */

type Interpolations = {
  [key: string]: string;
};

/**
 * Export `useTranslation` hook.
 */

export function useTranslation(labelId: string, interpolations?: Interpolations) {
  const { formatMessage } = useIntl();

  if (isEmpty(interpolations)) {
    return formatMessage({ id: getTranslation(labelId) });
  }

  return formatMessage({ id: getTranslation(labelId) }, interpolations);
}
