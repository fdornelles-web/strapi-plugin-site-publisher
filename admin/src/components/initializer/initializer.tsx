
/**
 * Module dependencies.
 */

import { pluginId } from '../../utils/plugin-id';
import { useEffect, useRef } from 'react';

/**
 * `InitializerProps` type.
 */

type InitializerProps = {
  setPlugin: (id: string) => void;
};

/**
 * Export `Initializer` component.
 */

export function Initializer({ setPlugin }: InitializerProps): null {
  const ref = useRef(setPlugin);

  useEffect(() => {
    ref.current(pluginId);
  }, []);

  return null;
}
