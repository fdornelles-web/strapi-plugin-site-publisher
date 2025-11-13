
/**
 * Module dependencies.
 */

import { Eye, ExternalLink } from '@strapi/icons';
import { FetchClient, useFetchClient } from '@strapi/strapi/admin';
import { IconButton } from '../icon-button/icon-button';
import { IconButtonGroup, Td as TableCell, Tr as TableRow, Typography} from '@strapi/design-system';
import { Label } from '../label/label';
import { ToastProps } from '../toast-message/toast-message';
import { format, formatDuration, intervalToDuration } from 'date-fns';
import { pluginId } from '../../utils/plugin-id';
import { useTranslation } from '../../hooks/use-translation';
import React, { Dispatch, SetStateAction, useState } from 'react';

/**
 * `Props` type.
 */

type Props = {
  createdAt: string;
  environment: string;
  htmlUrl: string;
  id: number;
  name: string;
  runNumber: number;
  setToastMessage: Dispatch<SetStateAction<ToastProps>>;
  setToastToggle: Dispatch<SetStateAction<boolean>>;
  startedAt: string;
  status: 'failure' | 'success' | null;
  updatedAt: string;
};

/**
 * Export `CustomRow` component.
 */

export function CustomRow(props: Props): React.JSX.Element {
  const {
    createdAt,
    environment,
    htmlUrl,
    id,
    name,
    runNumber,
    setToastMessage,
    setToastToggle,
    startedAt,
    status,
    updatedAt
  } = props;

  const isThereAConclusion = Boolean(status);
  const [disabledLogsButton, setDisabledLogsButton] = useState<boolean>(!isThereAConclusion);
  const intervalDuration = intervalToDuration({
    start: new Date(startedAt), 
    end: new Date(updatedAt)
  });

  const options = ['hours','minutes','seconds'];
  const duration = formatDuration(intervalDuration, { format: options });
  const creationDate = format(new Date(createdAt), 'dd/MM/yyyy hh:mm a');
  const inProgressLabel = useTranslation('plugin.workflow.inProgress');
  const iconEyeLabel = useTranslation('plugin.icons.eye');
  const iconExternalLinkLabel = useTranslation('plugin.icons.externalLink');
  const toastFailureTitle = useTranslation('plugin.toast.failure.title');
  const toastFailureDescription = useTranslation('plugin.toast.failure.description');
  const fetchClient = useFetchClient();

  async function handleGetLogs(id: number, fetchClient: FetchClient) {
    setDisabledLogsButton(true);

    try {
      const { data } = await fetchClient.get(`/${pluginId}/github-actions-logs`, {
        params: {
          jobId: id
        }
      });

      window.open(data.data, '_blank');
    } catch {
      setToastMessage({
        message: toastFailureDescription,
        title: toastFailureTitle,
        variant: 'danger'
      });

      setToastToggle(true);
    } finally {
      setDisabledLogsButton(false);
    }
  }

  return (
    <TableRow aria-rowindex={id}>
      <TableCell>
        <Typography>
          {runNumber}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {name}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {environment ? environment : '-'}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {status ? <Label status={status} /> : '-'}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {creationDate}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>
          {!isThereAConclusion ? inProgressLabel : duration}
        </Typography>
      </TableCell>
        
      <TableCell>
        <IconButtonGroup>
          <IconButton
            aria-label={iconEyeLabel}
            label={iconEyeLabel}
            disabled={disabledLogsButton}
            onClick={() => handleGetLogs(id, fetchClient)}
          >
            <Eye />
          </IconButton>

          <IconButton
            aria-label={iconExternalLinkLabel}
            label={iconExternalLinkLabel}
            onClick={() => window.open(htmlUrl, '_blank')}
          >
            <ExternalLink />
          </IconButton>
        </IconButtonGroup>
      </TableCell>
    </TableRow>
  );
}
