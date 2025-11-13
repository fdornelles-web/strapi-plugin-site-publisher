
/**
 * Module dependencies.
 */

import { Flex } from '@strapi/design-system';
import { Page, Layouts } from '@strapi/strapi/admin';
import { Guard } from '../../components/guard/guard';
import { PageWrapper } from '../../components/page-wrapper/page-wrapper';
import { TextField } from '../../components/text-field/text-field';
import { pluginId } from '../../utils/plugin-id';
import { useFetchData } from '../../hooks/use-fetch-data';
import { useTranslation } from '../../hooks/use-translation';
import React from 'react';
import pluginPermissions from '../../permissions';

/**
 * `SettingsPage` component.
 */

function SettingsPage(): React.JSX.Element {
  const { error, fetchedData: config, isLoading  } = useFetchData(`/${pluginId}/config`);
  const pageTitle = useTranslation('settings.pageTitle');
  const headerTitle = useTranslation('settings.headers.title');
  const headerSubtitle = useTranslation('settings.headers.subtitle');
  const githubTokenLabel = useTranslation('settings.fields.githubToken.name');
  const githubTokenHint = useTranslation('settings.fields.githubToken.hint');
  const githubTokenPlaceholder = useTranslation('settings.fields.githubToken.placeholder');
  const repoLabel = useTranslation('settings.fields.repo.name');
  const repoHint = useTranslation('settings.fields.repo.hint');
  const repoPlaceholder = useTranslation('settings.fields.repo.placeholder');
  const ownerLabel = useTranslation('settings.fields.owner.name');
  const ownerHint = useTranslation('settings.fields.owner.hint');
  const ownerPlaceholder = useTranslation('settings.fields.owner.placeholder');
  const branchLabel = useTranslation('settings.fields.branch.name');
  const branchHint = useTranslation('settings.fields.branch.hint');
  const branchPlaceholder = useTranslation('settings.fields.branch.placeholder');
  const workflowIdLabel = useTranslation('settings.fields.workflowId.name');
  const workflowIdHint = useTranslation('settings.fields.workflowId.hint');
  const workflowIdPlaceholder = useTranslation('settings.fields.workflowId.placeholder');
  const inputsHint = useTranslation('settings.fields.inputs.hint');
  const inputsPlaceholder = useTranslation('settings.fields.inputs.placeholder');

  // Protected value github token.
  const token = config?.githubToken;
  const githubToken = token 
    ? token.substring(0, 20) + '......' + token.substring(80)
    : githubTokenPlaceholder;

  // Convert the inputs object into an array.
  const inputs = config?.inputs ? Object.entries(config.inputs) : [];

  return (
    <PageWrapper
      baseHeaderLayout={
        <Layouts.Header
          subtitle={headerSubtitle} 
          displayName={pageTitle}
          title={headerTitle}
        />
      }
      isLoading={isLoading}
      pageTitle={pageTitle}
    >
      <Guard error={error}>
        <Flex 
          alignItems={'left-start'}
          direction={'column'}
          gap={6}
        >
          <TextField
            ariaLabel={githubTokenLabel}
            disabled
            hint={githubTokenHint}
            key={'githubToken'}
            label={githubTokenLabel}
            name={'githubToken'}
            required
            value={githubToken}
          />

          <TextField
            ariaLabel={ownerLabel}
            disabled
            hint={ownerHint}
            key={'owner'}
            label={ownerLabel}
            name={'owner'}
            required
            value={config?.owner ?? ownerPlaceholder}
          />

          <TextField
            ariaLabel={repoLabel}
            disabled
            hint={repoHint}
            key={'repo'}
            label={repoLabel}
            name={'repo'}
            required
            value={config?.repo ?? repoPlaceholder}
          />

          <TextField
            ariaLabel={workflowIdLabel}
            disabled
            hint={workflowIdHint}
            key={'workflow_id'}
            label={workflowIdLabel}
            name={'workflow_id'}
            required
            value={config?.workflowId ?? workflowIdPlaceholder}
          />

          <TextField
            ariaLabel={branchLabel}
            disabled
            hint={branchHint}
            key={'branch'}
            label={branchLabel}
            name={'branch'}
            required
            value={config?.branch ?? branchPlaceholder}
          />

          {inputs.map(entry => {
            const [key, value] = entry;
            const inputsLabel = useTranslation(
              'settings.fields.inputs.name',
              { 'variable' : key }
            );
  
            return (
              <TextField
                ariaLabel={inputsLabel}
                disabled
                hint={inputsHint}
                key={key}
                label={inputsLabel}
                name={'input'}
                value={value as string ?? inputsPlaceholder}
              />
            );
          })}
        </Flex>
      </Guard>
    </PageWrapper>
  );
}

/**
 * Export `ProtectedSettingsPage`.
 */

export default function ProtectedSettingsPage(): React.JSX.Element {
  return (
    <Page.Protect permissions={pluginPermissions.settings}>
      <SettingsPage />
    </Page.Protect>
  );
}
