import axios from "axios";
const name = "strapi-plugin-site-publisher";
const version = "1.3.5";
const description = "This is a plugin for Strapi headless CMS. It lets you trigger a GitHub Action workflow when the site is ready to be published.";
const keywords = [
  "publisher",
  "strapi",
  "plugin"
];
const repository = {
  type: "git",
  url: "https://github.com/seegno-labs/strapi-plugin-site-publisher"
};
const license = "UNLICENSED";
const author = "Seegno";
const exports = {
  "./package.json": "./package.json",
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.ts",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  }
};
const files = [
  "dist"
];
const scripts = {
  build: "strapi-plugin build",
  changelog: "github_changelog_generator --no-issues --header-label='# Changelog' --future-release=v$npm_config_future_release",
  watch: "strapi-plugin watch",
  "watch:link": "strapi-plugin watch:link",
  verify: "strapi-plugin verify",
  version: "NODE_ENV=production npm run build && npm run changelog --future-release=$npm_package_version && git add -A CHANGELOG.md dist"
};
const dependencies = {
  "@strapi/design-system": "^2.0.0-rc.14",
  "@strapi/icons": "^2.0.0-rc.14",
  "@strapi/strapi": "^5.8.0",
  axios: "^1.4.0",
  "prop-types": "^15.7.2",
  "react-intl": "^6.6.2"
};
const devDependencies = {
  "@strapi/sdk-plugin": "^5.3.0",
  "@strapi/typescript-utils": "^5.8.0",
  "@types/react": "^18.3.1",
  "@types/react-dom": "^19.0.3",
  "@types/react-router-dom": "^5.3.3",
  "@types/styled-components": "^5.1.26",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.2",
  "styled-components": "^6.1.14",
  typescript: "^5.7.3"
};
const peerDependencies = {
  "@strapi/sdk-plugin": "^5.3.0",
  "@strapi/strapi": "^5.8.0",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.2",
  "styled-components": "^6.1.14"
};
const engines = {
  node: ">=20.5.0"
};
const strapi = {
  displayName: "Site publisher",
  description: "This is a plugin for headless CMS. It lets you trigger a GitHub Action workflow when the site is ready to be published.",
  kind: "plugin",
  name: "site-publisher"
};
const pluginPkg = {
  name,
  version,
  "private": "true",
  description,
  keywords,
  repository,
  license,
  author,
  exports,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi
};
const pluginId = pluginPkg.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, "");
const routes = [{
  config: {
    policies: [
      "admin::isAuthenticatedAdmin",
      {
        name: "admin::hasPermissions",
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: "sitePublisher.inProgressCheck",
  method: "GET",
  path: "/github-actions-check"
}, {
  config: {
    policies: [
      "admin::isAuthenticatedAdmin",
      {
        name: "admin::hasPermissions",
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: "sitePublisher.history",
  method: "GET",
  path: "/github-actions-history"
}, {
  config: {
    policies: [
      "admin::isAuthenticatedAdmin",
      {
        name: "admin::hasPermissions",
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: "sitePublisher.logs",
  method: "GET",
  path: "/github-actions-logs"
}, {
  config: {
    policies: [
      "admin::isAuthenticatedAdmin",
      {
        name: "admin::hasPermissions",
        config: {
          actions: [`plugin::${pluginId}.trigger`]
        }
      }
    ]
  },
  handler: "sitePublisher.trigger",
  method: "POST",
  path: "/github-actions-trigger"
}, {
  config: {
    policies: [
      "admin::isAuthenticatedAdmin",
      {
        name: "admin::hasPermissions",
        config: {
          actions: [`plugin::${pluginId}.settings`]
        }
      }
    ]
  },
  handler: "sitePublisher.config",
  method: "GET",
  path: "/config"
}];
const bootstrap = async ({ strapi: strapi2 }) => {
  const actions = [{
    displayName: "Trigger builds",
    pluginName: pluginId,
    section: "plugins",
    subCategory: "general",
    uid: "trigger"
  }, {
    category: "website deploy",
    displayName: "Access settings",
    pluginName: pluginId,
    section: "settings",
    uid: "settings"
  }];
  await strapi2.admin.services.permission.actionProvider.registerMany(actions);
};
const config$1 = {
  default: {},
  validator({ owner, repo, branch, workflowId, githubToken, inputs }) {
    if (owner && typeof owner !== "string") {
      throw new Error("`owner` key in your plugin config has to be a string");
    }
    if (!owner) {
      throw new Error("`owner` key is missing in your plugin config");
    }
    if (repo && typeof repo !== "string") {
      throw new Error("`repo` key in your plugin config has to be a string");
    }
    if (!repo) {
      throw new Error("`repo` key is missing in your plugin config");
    }
    if (branch && typeof branch !== "string") {
      throw new Error("`branch` key in your plugin config has to be a string");
    }
    if (!branch) {
      throw new Error("`branch` key is missing in your plugin config");
    }
    if (workflowId && typeof workflowId !== "string") {
      throw new Error("`workflowId` key in your plugin config has to be an string");
    }
    if (!workflowId) {
      throw new Error("`workflowId` key is missing in your plugin config");
    }
    if (githubToken && typeof githubToken !== "string") {
      throw new Error("`githubToken` key in your plugin config has to be a string");
    }
    if (!githubToken) {
      throw new Error("`githubToken` key is missing in your plugin config");
    }
    if (inputs && typeof inputs !== "object") {
      throw new Error("`inputs` key in your plugin config has to be a object");
    }
  }
};
const sitePublisher = ({ strapi: strapi2 }) => ({
  async inProgressCheck(ctx) {
    const data = await strapi2.plugin(pluginId).service("githubActions").inProgressCheck();
    ctx.body = { data };
  },
  async config(ctx) {
    const data = await strapi2.plugin(pluginId).service("config").config();
    ctx.body = { data };
  },
  async history(ctx) {
    const data = await strapi2.plugin(pluginId).service("githubActions").history();
    ctx.body = { data };
  },
  async logs(ctx) {
    const { jobId } = ctx.request.query;
    const data = await strapi2.plugin(pluginId).service("githubActions").logs(jobId);
    ctx.body = { data };
  },
  async trigger(ctx) {
    const data = await strapi2.plugin(pluginId).service("githubActions").trigger();
    ctx.body = { data };
  }
});
const controllers = {
  sitePublisher
};
const destroy = () => {
};
const register = () => {
};
const config = ({ strapi: strapi2 }) => ({
  async config() {
    return strapi2.config.get(`plugin::${pluginId}`);
  }
});
const githubActions = ({ strapi: strapi2 }) => ({
  async inProgressCheck() {
    try {
      const config2 = strapi2.config.get(`plugin::${pluginId}`);
      const { branch, githubToken, owner, repo, workflowId } = config2 ?? {};
      const headers = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`
      };
      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`);
      url.searchParams.append("branch", branch);
      url.searchParams.append("status", "in_progress");
      const res = await axios.get(url.toString(), { headers });
      return res.data ?? null;
    } catch (error) {
      return error;
    }
  },
  async trigger() {
    try {
      const config2 = strapi2.config.get(`plugin::${pluginId}`);
      const { branch: ref, githubToken, inputs, owner, repo, workflowId } = config2;
      const headers = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`
      };
      const data = { ref, inputs };
      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`);
      const res = await axios.post(url.toString(), data, { headers });
      const success = res.status === 204;
      if (success) {
        await new Promise((resolve) => setTimeout(resolve, 15e3));
      }
      return success ?? null;
    } catch (error) {
      return error;
    }
  },
  async history() {
    try {
      const config2 = strapi2.config.get(`plugin::${pluginId}`);
      const { branch, githubToken, owner, repo, workflowId } = config2;
      const headers = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`
      };
      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`);
      url.searchParams.append("branch", branch);
      const res = await axios.get(url.toString(), { headers });
      return res.data ?? null;
    } catch (error) {
      return error;
    }
  },
  async logs(jobId) {
    try {
      const config2 = strapi2.config.get(`plugin::${pluginId}`);
      const { githubToken, owner, repo } = config2;
      const headers = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`
      };
      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/runs/${jobId}/logs`);
      const res = await axios.get(url.toString(), { headers });
      return res.request.res.responseUrl ?? null;
    } catch (error) {
      return error;
    }
  }
});
const services = {
  config,
  githubActions
};
const index = {
  bootstrap,
  config: config$1,
  controllers,
  destroy,
  register,
  routes,
  services
};
export {
  index as default
};
