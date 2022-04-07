# @cloak-app/utils

Shared utility functions for Cloak packages.

- [View demo](https://cloak-utils.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-utils)

## Usage

```vue
<cloak-utils />
```

## Install

1. Install with `yarn add @cloak-app/utils`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/utils/nuxt']`

### Project Dependencies

- `.max-w*` styles (included in Cloak via `whitespace.styl`)

### Module Options

- `cloak.utils:`
  - `maxWidthClass` - The default max-width class to use for the block.

## Components

### `cloak-utils-block`

Renders a Block to be used within a Tower.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
