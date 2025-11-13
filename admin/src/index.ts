
/**
 * Module dependencies.
 */

import { Initializer } from './components/initializer/initializer';
import { Rocket } from '@strapi/icons';
import { pluginId } from './utils/plugin-id';
import { prefixPluginTranslations } from './utils/prefix-plugin-translator';
import pluginPermissions from './permissions';
import pluginPkg from '../../package.json';

/**
 * Plugin name.
 */

const { name } = pluginPkg.strapi;

/**
 * Export site publisher.
 */

export default {

  /**
   * Register.
   */

  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Rocket,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Site publisher'
      },
      Component: async () => {
        return await import('./pages/home-page/home-page');
      },
      permissions: pluginPermissions.trigger
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
            defaultMessage: 'Configuration'
          },
          to: `/settings/${pluginId}`,
          Component: async () => {
            return await import('./pages/settings-page/settings-page');
          },
          permissions: pluginPermissions.settings
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

  bootstrap() {},

  /**
   * Register trads.
   */

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  }
};
