import { jsxs, jsx } from "react/jsx-runtime";
import { Field, TextInput, Flex } from "@strapi/design-system";
import { Page, Layouts } from "@strapi/strapi/admin";
import { a as useFetchData, u as useTranslation, P as PageWrapper, G as Guard } from "./use-fetch-data-CklQTuw3.mjs";
import { a as permissions, p as pluginId } from "./index-CO6wZDa6.mjs";
function TextField(props) {
  const { ariaLabel, hint, label, name, required, ...rest } = props;
  return /* @__PURE__ */ jsxs(
    Field.Root,
    {
      required,
      id: name,
      hint,
      children: [
        /* @__PURE__ */ jsx(Field.Label, { children: label }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            ...rest,
            "aria-label": ariaLabel,
            name
          }
        ),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ]
    }
  );
}
function SettingsPage() {
  const { error, fetchedData: config, isLoading } = useFetchData(`/${pluginId}/config`);
  const pageTitle = useTranslation("settings.pageTitle");
  const headerTitle = useTranslation("settings.headers.title");
  const headerSubtitle = useTranslation("settings.headers.subtitle");
  const githubTokenLabel = useTranslation("settings.fields.githubToken.name");
  const githubTokenHint = useTranslation("settings.fields.githubToken.hint");
  const githubTokenPlaceholder = useTranslation("settings.fields.githubToken.placeholder");
  const repoLabel = useTranslation("settings.fields.repo.name");
  const repoHint = useTranslation("settings.fields.repo.hint");
  const repoPlaceholder = useTranslation("settings.fields.repo.placeholder");
  const ownerLabel = useTranslation("settings.fields.owner.name");
  const ownerHint = useTranslation("settings.fields.owner.hint");
  const ownerPlaceholder = useTranslation("settings.fields.owner.placeholder");
  const branchLabel = useTranslation("settings.fields.branch.name");
  const branchHint = useTranslation("settings.fields.branch.hint");
  const branchPlaceholder = useTranslation("settings.fields.branch.placeholder");
  const workflowIdLabel = useTranslation("settings.fields.workflowId.name");
  const workflowIdHint = useTranslation("settings.fields.workflowId.hint");
  const workflowIdPlaceholder = useTranslation("settings.fields.workflowId.placeholder");
  const inputsHint = useTranslation("settings.fields.inputs.hint");
  const inputsPlaceholder = useTranslation("settings.fields.inputs.placeholder");
  const token = config?.githubToken;
  const githubToken = token ? token.substring(0, 20) + "......" + token.substring(80) : githubTokenPlaceholder;
  const inputs = config?.inputs ? Object.entries(config.inputs) : [];
  return /* @__PURE__ */ jsx(
    PageWrapper,
    {
      baseHeaderLayout: /* @__PURE__ */ jsx(
        Layouts.Header,
        {
          subtitle: headerSubtitle,
          displayName: pageTitle,
          title: headerTitle
        }
      ),
      isLoading,
      pageTitle,
      children: /* @__PURE__ */ jsx(Guard, { error, children: /* @__PURE__ */ jsxs(
        Flex,
        {
          alignItems: "left-start",
          direction: "column",
          gap: 6,
          children: [
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
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
              const inputsLabel = useTranslation(
                "settings.fields.inputs.name",
                { "variable": key }
              );
              return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(Page.Protect, { permissions: permissions.settings, children: /* @__PURE__ */ jsx(SettingsPage, {}) });
}
export {
  ProtectedSettingsPage as default
};
