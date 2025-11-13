
/**
 * Module dependencies.
 */

import { Field, TextInput  } from '@strapi/design-system';
import React from 'react';

/**
 * `Props` type.
 */

type Props = {
  ariaLabel: string;
  disabled?: boolean;
  hint?: string;
  label: string;
  name: string;
  required?: boolean;
  value: string;
};

/**
 * Export `TextField` component.
 */

export function TextField(props: Props): React.JSX.Element {
  const { ariaLabel, hint, label, name, required, ...rest  } = props;

  return (
    <Field.Root
      required={required}
      id={name}
      hint={hint}
    >
      <Field.Label>
        {label}
      </Field.Label>

      <TextInput 
        {...rest}
        aria-label={ariaLabel}
        name={name}
      />

      <Field.Hint />
    </Field.Root>
  );
}
