
/**
 * Module dependencies.
 */

import { Config } from '../types/config';
import { Core } from '@strapi/strapi';
import { pluginId } from '../utils/plugin-id';
import axios from 'axios';

/**
 * Export `githubActions`.
 */

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async inProgressCheck() {
    try {
      const config = strapi.config.get(`plugin::${pluginId}`) as Config;
      const { branch, githubToken, owner, repo, workflowId } = config ?? {};
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${githubToken}`
      };

      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`);

      url.searchParams.append('branch', branch);
      url.searchParams.append('status', 'in_progress');

      const res = await axios.get(url.toString(), { headers });

      return res.data ?? null;
    }
    catch (error) {
      return error;
    }
  },

  async trigger() {
    try {
      const config = strapi.config.get(`plugin::${pluginId}`) as Config;
      const { branch: ref, githubToken, inputs, owner, repo, workflowId } = config;
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${githubToken}`
      };

      const data = { ref, inputs };
      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`);
      const res = await axios.post(url.toString(), data, { headers });
      const success = res.status === 204;

      /* Wait a few seconds because Github does not return the new job instantly */
      if (success) {
        await new Promise((resolve) => setTimeout(resolve, 15000));
      }

      return success ?? null;
    }
    catch(error) {
      return error;
    }
  },

  async history() {
    try {
      const config = strapi.config.get(`plugin::${pluginId}`) as Config;
      const { branch, githubToken, owner, repo, workflowId } = config;
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${githubToken}`
      };

      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`);

      url.searchParams.append('branch', branch);

      const res = await axios.get(url.toString(), { headers });

      return res.data ?? null;
    }
    catch (error) {
      return error;
    }
  },

  async logs(jobId: number) {
    try {
      const config = strapi.config.get(`plugin::${pluginId}`) as Config;
      const { githubToken, owner, repo } = config;
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${githubToken}`
      };

      const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/runs/${jobId}/logs`);
      const res = await axios.get(url.toString(), { headers });

      return res.request.res.responseUrl ?? null;
    }
    catch (error) {
      return error;
    }
  }
});
