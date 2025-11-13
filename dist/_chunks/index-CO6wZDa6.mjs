import { useRef, useEffect } from "react";
import { Rocket } from "@strapi/icons";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const name$1 = "strapi-plugin-site-publisher";
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
  name: name$1,
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
function Initializer({ setPlugin }) {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(pluginId);
  }, []);
  return null;
}
function prefixPluginTranslations(trad, pluginId2) {
  if (!pluginId2) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
}
const permissions = {
  settings: [{
    action: `plugin::${pluginId}.settings`,
    subject: null
  }],
  trigger: [{
    action: `plugin::${pluginId}.trigger`,
    subject: null
  }]
};
const { name } = pluginPkg.strapi;
const index = {
  /**
   * Register.
   */
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Rocket,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Site publisher"
      },
      Component: async () => {
        return await import("./home-page-DR4KhMKd.mjs");
      },
      permissions: permissions.trigger
    });
    const pluginPrefix = `${pluginId}.settings`;
    app.createSettingSection(
      {
        id: pluginPrefix,
        intlLabel: {
          id: `${pluginPrefix}.title`,
          defaultMessage: name
        }
      },
      [
        {
          id: pluginPrefix,
          intlLabel: {
            id: `${pluginPrefix}.subtitle.config`,
            defaultMessage: "Configuration"
          },
          to: `/settings/${pluginId}`,
          Component: async () => {
            return await import("./settings-page-BIGhxW8B.mjs");
          },
          permissions: permissions.settings
        }
      ]
    );
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name
    });
  },
  /**
   * Bootstrap.
   */
  bootstrap() {
  },
  /**
   * Register trads.
   */
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-CKGwoZD3.mjs"), "./translations/pt.json": () => import("./pt-BJ7rO80l.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
export {
  permissions as a,
  index as i,
  pluginId as p
};
