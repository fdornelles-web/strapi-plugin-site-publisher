
/**
 * Module dependencies.
 */

import * as Tooltip from '@radix-ui/react-tooltip';
import { Typography, IconButton as DefaultIconButton } from '@strapi/design-system';

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

export function IconButton (props: Props) {
  const { children, label, variant, onClick, disabled } = props;

  if (!label)
    return (
      <DefaultIconButton
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        withTooltip={false}
      >
        {children}
      </DefaultIconButton>
    );

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <DefaultIconButton
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            withTooltip={false}
          >
            {children}
          </DefaultIconButton>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content sideOffset={5}>
            <Typography>
              {label}
            </Typography>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
