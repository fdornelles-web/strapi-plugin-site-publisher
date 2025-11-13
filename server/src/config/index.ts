
/**
 * Export `config`.
 */

export default {
  default: {},
  validator({ owner, repo, branch, workflowId, githubToken, inputs }) {
    if (owner && typeof owner !== 'string') {
      throw new Error('`owner` key in your plugin config has to be a string');
    }

    if (!owner) {
      throw new Error('`owner` key is missing in your plugin config');
    }

    if (repo && typeof repo !== 'string') {
      throw new Error('`repo` key in your plugin config has to be a string');
    }

    if (!repo) {
      throw new Error('`repo` key is missing in your plugin config');
    }

    if (branch && typeof branch !== 'string') {
      throw new Error('`branch` key in your plugin config has to be a string');
    }

    if (!branch) {
      throw new Error('`branch` key is missing in your plugin config');
    }

    if (workflowId && typeof workflowId !== 'string') {
      throw new Error('`workflowId` key in your plugin config has to be an string');
    }

    if (!workflowId) {
      throw new Error('`workflowId` key is missing in your plugin config');
    }

    if (githubToken && typeof githubToken !== 'string') {
      throw new Error('`githubToken` key in your plugin config has to be a string');
    }

    if (!githubToken) {
      throw new Error('`githubToken` key is missing in your plugin config');
    }
    
    if (inputs && typeof inputs !== 'object') {
      throw new Error('`inputs` key in your plugin config has to be a object');
    }
  }
};
