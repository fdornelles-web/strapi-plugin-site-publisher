
/**
 * Module dependencies.
 */

import { ArrowClockwise, ArrowLeft, Upload } from '@strapi/icons';
import {
  Button,
  IconButtonGroup,
  Link,
  Table,
  Tbody,
  TextButton,
  Th as TableHead,
  Thead,
  Tr as TableRow,
  Typography,
  VisuallyHidden
} from '@strapi/design-system';

import { CustomRow } from '../../components/custom-row/custom-row';
import { Guard } from '../../components/guard/guard';
import { NavLink } from 'react-router-dom';
import { Page, Layouts, useFetchClient } from '@strapi/strapi/admin';
import { PageWrapper } from '../../components/page-wrapper/page-wrapper';
import { ToastMessage, ToastProps } from '../../components/toast-message/toast-message';
import { isEmpty } from 'lodash';
import { pluginId } from '../../utils/plugin-id';
import { useFetchData } from '../../hooks/use-fetch-data';
import { useTranslation } from '../../hooks/use-translation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import pluginPermissions from '../../permissions';

/**
 * Interval between checks.
 */

const intervalBetweenChecks = 10000;

/**
 * `HomePage` component.
 */

function HomePage(): React.JSX.Element {
  const [isStart, setIsStart] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [toastToggle, setToastToggle] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [history, setHistory] = useState<Array<any>>([]);
  const fetchClient = useFetchClient();
  const [toastMessage, setToastMessage] = useState<ToastProps>({
    message: null,
    title: null,
    variant: 'default'
  });

  const timeoutRef = useRef(null);
  const title = useTranslation('plugin.title');
  const headerTitle = useTranslation('plugin.headers.title');
  const headerSubtitle = useTranslation('plugin.headers.subtitle');
  const toastSuccessTitle = useTranslation('plugin.toast.success.title');
  const toastSuccessDescription = useTranslation('plugin.toast.success.description');
  const toastFailureTitle = useTranslation('plugin.toast.failure.title');
  const toastFailureDescription = useTranslation('plugin.toast.failure.description');
  const toastConfirmationTitle = useTranslation('plugin.toast.confirmation.title');
  const toastConfirmationDescription = useTranslation('plugin.toast.confirmation.description');
  const refreshButton = useTranslation('button.refresh');
  const backButton = useTranslation('button.back');
  const confirmButton = useTranslation('button.confirm');
  const cancelButton = useTranslation('button.cancel');
  const triggerButton = useTranslation('button.trigger');
  const tableHeaderRunNumber = useTranslation('plugin.table.headers.runNumber');
  const tableHeaderWorkflowName = useTranslation('plugin.table.headers.workflowName');
  const tableHeaderEnvironment = useTranslation('plugin.table.headers.environment');
  const tableHeaderStatus = useTranslation('plugin.table.headers.status');
  const tableHeaderCreationDate = useTranslation('plugin.table.headers.creationDate');
  const tableHeaderDuration = useTranslation('plugin.table.headers.duration');
  const tableHeaderItems = [
    tableHeaderRunNumber,
    tableHeaderWorkflowName,
    tableHeaderEnvironment,
    tableHeaderStatus,
    tableHeaderCreationDate,
    tableHeaderDuration,
    <VisuallyHidden key="actions" />
  ];

  const {
    error,
    fetchedData,
    isLoading,
    setRefetch
  } = useFetchData(`/${pluginId}/github-actions-history`);

  const { fetchedData: config } = useFetchData(`/${pluginId}/config`);
  const inProgressCheck = useCallback(async (nameInConfig?: string) => {
    const { data: inProgress } = await fetchClient.get(`/${pluginId}/github-actions-check`);

    if (inProgress && inProgress?.data?.total_count > 0) {
      inProgress?.data?.workflow_runs?.forEach((run: any) => {
        const nameInProgress = run.name.split('in ')[1];
        
        if (nameInConfig === nameInProgress) {
          setDisabledButton(true);
        }
      });
    }
    else {
      setDisabledButton(false);
    }

    setTimeout(() => inProgressCheck(nameInConfig), intervalBetweenChecks);
  }, []);

  useEffect(() => {
    if (config) {
      inProgressCheck(config?.inputs?.environment);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [config]);

  /* Refresh page automatically as soon as the process finishes */
  useEffect(() => {
    if (!disabledButton && !isStart) {
      setRefetch({});
    }
  }, [disabledButton]);

  useEffect(() => {
    setIsStart(false);
    setHistory(fetchedData?.workflow_runs);
    setTotalCount(fetchedData?.total_count);
  },[fetchedData]);

  const triggerPublish = async () => {
    setLoadingButton(true);

    try {
      const { data } = await fetchClient.post(`/${pluginId}/github-actions-trigger`);

      if (data.data === true) {
        setToastMessage({
          action: (
            <TextButton
              endIcon={<ArrowClockwise />}
              onClick={() => {
                setRefetch({});
                setToastToggle(false);
              }}
            >
              {refreshButton}
            </TextButton>
          ),
          message: toastSuccessDescription,
          title: toastSuccessTitle,
          variant: 'success'
        });
      } else {
        setToastMessage({
          message: toastFailureDescription,
          title: toastFailureTitle,
          variant: 'danger'
        });
      }

      setToastToggle(true);
    } 
    catch {
      setToastMessage({
        message: toastFailureDescription,
        title: toastFailureTitle,
        variant: 'danger'
      });

      setToastToggle(true);
    }
    finally {
      setLoadingButton(false);
    }
  };

  const handleClick = () => {
    setToastMessage({
      action: (
        <IconButtonGroup gap={2}>
          <Button
            onClick={() => setToastToggle(false)}
            variant={'secondary'}
          >
            {cancelButton}
          </Button>

          <Button
            onClick={() => {
              triggerPublish();
              setToastToggle(false);
            }}
            variant={'default'}
          >
            {confirmButton}
          </Button>
        </IconButtonGroup>
      ),
      message: toastConfirmationDescription,
      title: toastConfirmationTitle,
      variant: 'default'
    });

    setToastToggle(true);
  };

  return (
    <PageWrapper
      baseHeaderLayout={
        <Layouts.Header
          navigationAction={
            <Link 
              as={NavLink}
              startIcon={<ArrowLeft />}
              to={'/'}
            >
              {backButton}
            </Link>
          }
          primaryAction={
            <Button
              disabled={isLoading || disabledButton || !isEmpty(error)}
              loading={loadingButton}
              onClick={handleClick}
              size={'L'}
              startIcon={<Upload />}
              variant={'default'}
            >
              {triggerButton}
            </Button>
          }
          subtitle={headerSubtitle}
          title={headerTitle}
        />
      }
      isLoading={isLoading}
      pageTitle={title}
    >
      {toastToggle && (
        <ToastMessage
          {...toastMessage}
          onClose={() => setToastToggle(false)} />
      )}

      <Guard error={error}>
        <Table
          colCount={tableHeaderItems.length}
          rowCount={totalCount}
        >
          <Thead>
            <TableRow>
              {tableHeaderItems.map((title, index) => (
                <TableHead key={index}>
                  <Typography variant={'sigma'}>
                    {title}
                  </Typography>
                </TableHead>
              ))}
            </TableRow>
          </Thead>

          <Tbody>
            {history?.map(historyItem => {
              const {
                conclusion,
                created_at,
                html_url,
                id,
                name,
                run_number,
                run_started_at,
                updated_at
              } = historyItem;

              return (
                <CustomRow
                  createdAt={created_at}
                  environment={name.split('in')[1]}
                  htmlUrl={html_url}
                  id={id}
                  name={name.split('in')[0]}
                  key={id}
                  runNumber={run_number}
                  setToastMessage={setToastMessage}
                  setToastToggle={setToastToggle}
                  startedAt={run_started_at}
                  status={conclusion}
                  updatedAt={updated_at}
                />
              );
            })}
          </Tbody>
        </Table>
      </Guard>
    </PageWrapper>
  );
}

/**
 * Export `ProtectedHomePage`.
 */

export default function ProtectedHomePage(): React.JSX.Element {
  return (
    <Page.Protect permissions={pluginPermissions.trigger}>
      <HomePage />
    </Page.Protect>
  );
}
