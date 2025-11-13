# Strapi plugin site-publisher

This is a plugin for [Strapi](https://github.com/strapi/strapi) headless CMS. It lets you trigger a GitHub Action workflow when the site is ready to be published.

## Compatibility
| Strapi version | Plugin version |
| - | - |
| v5 | v1 |
| v4 | v0 |

## Installation

Install from our private registry:

```bash
npm install @fdornelles-web/strapi-plugin-site-publisher --registry=https://npm.pkg.github.com
```

Or install from the repository:

```sh
yarn add "git+ssh://git@github.com:fdornelles-web/strapi-plugin-site-publisher.git#v1.3.5"
```


# Configuration

The plugin can be customized via the plugin config. To do, edit your plugins.js file.

## Example configuration

`config/plugins.js`

```
export default ({ env }) => ({
  'site-publisher': {
    branch: 'develop',
    githubToken: env('GITHUB_TOKEN'),
    inputs: {
      some_input: 'Some value',
      some_other_input: 'Some other value',
    },
    owner: 'username',
    repo: 'reponame',
    workflowId: 'restart.yaml',
  }
});
```

## Configuration fields

| Field | Required | Description |
| - | - | - |
| branch | ✅ | The branch where the workflow to be triggered is located. |
| githubToken | ✅ | The GitHub personal access token with access to trigger workflows and view build status. |
| inputs | ❌ | Optional inputs to pass through to the GitHub workflow. |
| owner | ✅ | The Github organization or user. |
| repo | ✅| The name of the repository. |
| workflowId | ✅ | The workflow id or filename. |

## Release

Create a new release:

```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
```

Then push changes:

```sh
git push origin master && git push --tags
```
