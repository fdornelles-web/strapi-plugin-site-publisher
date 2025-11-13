"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const useFetchData = require("./use-fetch-data-CFpgph9H.js");
const index = require("./index-ICzntoVl.js");
function TextField(props) {
  const { ariaLabel, hint, label, name, required, ...rest } = props;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      required,
      id: name,
      hint,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.TextInput,
          {
            ...rest,
            "aria-label": ariaLabel,
            name
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ]
    }
  );
}
function SettingsPage() {
  const { error, fetchedData: config, isLoading } = useFetchData.useFetchData(`/${index.pluginId}/config`);
  const pageTitle = useFetchData.useTranslation("settings.pageTitle");
  const headerTitle = useFetchData.useTranslation("settings.headers.title");
  const headerSubtitle = useFetchData.useTranslation("settings.headers.subtitle");
  const githubTokenLabel = useFetchData.useTranslation("settings.fields.githubToken.name");
  const githubTokenHint = useFetchData.useTranslation("settings.fields.githubToken.hint");
  const githubTokenPlaceholder = useFetchData.useTranslation("settings.fields.githubToken.placeholder");
  const repoLabel = useFetchData.useTranslation("settings.fields.repo.name");
  const repoHint = useFetchData.useTranslation("settings.fields.repo.hint");
  const repoPlaceholder = useFetchData.useTranslation("settings.fields.repo.placeholder");
  const ownerLabel = useFetchData.useTranslation("settings.fields.owner.name");
  const ownerHint = useFetchData.useTranslation("settings.fields.owner.hint");
  const ownerPlaceholder = useFetchData.useTranslation("settings.fields.owner.placeholder");
  const branchLabel = useFetchData.useTranslation("settings.fields.branch.name");
  const branchHint = useFetchData.useTranslation("settings.fields.branch.hint");
  const branchPlaceholder = useFetchData.useTranslation("settings.fields.branch.placeholder");
  const workflowIdLabel = useFetchData.useTranslation("settings.fields.workflowId.name");
  const workflowIdHint = useFetchData.useTranslation("settings.fields.workflowId.hint");
  const workflowIdPlaceholder = useFetchData.useTranslation("settings.fields.workflowId.placeholder");
  const inputsHint = useFetchData.useTranslation("settings.fields.inputs.hint");
  const inputsPlaceholder = useFetchData.useTranslation("settings.fields.inputs.placeholder");
  const token = config?.githubToken;
  const githubToken = token ? token.substring(0, 20) + "......" + token.substring(80) : githubTokenPlaceholder;
  const inputs = config?.inputs ? Object.entries(config.inputs) : [];
  return /* @__PURE__ */ jsxRuntime.jsx(
    useFetchData.PageWrapper,
    {
      baseHeaderLayout: /* @__PURE__ */ jsxRuntime.jsx(
        admin.Layouts.Header,
        {
          subtitle: headerSubtitle,
          displayName: pageTitle,
          title: headerTitle
        }
      ),
      isLoading,
      pageTitle,
      children: /* @__PURE__ */ jsxRuntime.jsx(useFetchData.Guard, { error, children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          alignItems: "left-start",
          direction: "column",
          gap: 6,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              TextField,
              {
                ariaLabel: githubTokenLabel,
                disabled: true,
                hint: githubTokenHint,
                label: githubTokenLabel,
                name: "githubToken",
                required: true,
                value: githubToken
              },
              "githubToken"
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              TextField,
              {
                ariaLabel: ownerLabel,
                disabled: true,
                hint: ownerHint,
                label: ownerLabel,
                name: "owner",
                required: true,
                value: config?.owner ?? ownerPlaceholder
              },
              "owner"
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              TextField,
              {
                ariaLabel: repoLabel,
                disabled: true,
                hint: repoHint,
                label: repoLabel,
                name: "repo",
                required: true,
                value: config?.repo ?? repoPlaceholder
              },
              "repo"
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              TextField,
              {
                ariaLabel: workflowIdLabel,
                disabled: true,
                hint: workflowIdHint,
                label: workflowIdLabel,
                name: "workflow_id",
                required: true,
                value: config?.workflowId ?? workflowIdPlaceholder
              },
              "workflow_id"
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              TextField,
              {
                ariaLabel: branchLabel,
                disabled: true,
                hint: branchHint,
                label: branchLabel,
                name: "branch",
                required: true,
                value: config?.branch ?? branchPlaceholder
              },
              "branch"
            ),
            inputs.map((entry) => {
              const [key, value] = entry;
              const inputsLabel = useFetchData.useTranslation(
                "settings.fields.inputs.name",
                { "variable": key }
              );
              return /* @__PURE__ */ jsxRuntime.jsx(
                TextField,
                {
                  ariaLabel: inputsLabel,
                  disabled: true,
                  hint: inputsHint,
                  label: inputsLabel,
                  name: "input",
                  value: value ?? inputsPlaceholder
                },
                key
              );
            })
          ]
        }
      ) })
    }
  );
}
function ProtectedSettingsPage() {
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Protect, { permissions: index.permissions.settings, children: /* @__PURE__ */ jsxRuntime.jsx(SettingsPage, {}) });
}
exports.default = ProtectedSettingsPage;
