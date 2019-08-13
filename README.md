# pkg-discovery

[![Version](https://img.shields.io/npm/v/pkg-discovery.svg)](https://www.npmjs.com/package/pkg-discovery)
[![Downloads](https://img.shields.io/npm/dt/pkg-discovery.svg)](https://www.npmjs.com/package/pkg-discovery)
[![Build Status](https://img.shields.io/travis/ricardogobbosouza/pkg-discovery)](https://travis-ci.org/ricardogobbosouza/pkg-discovery)
[![Codecov](https://img.shields.io/codecov/c/github/ricardogobbosouza/pkg-discovery)](https://codecov.io/gh/ricardogobbosouza/pkg-discovery)
[![License](https://img.shields.io/npm/l/pkg-discovery.svg)](LICENSE)

> Discovery the dependencies and devDependencies of package

## Install

```bash
npm install --save pkg-discovery
```

## Usage

```js
const pkgDiscovery = require('pkg-discovery');

(async () => {
  console.log(await pkgDiscovery({ field: 'foo' }));
  /*
  Dependencies that have the `foo` field  on your `package.json`
  {
    'dependency-1': {
      content of `foo` field
    },

    'dependency-2': {
      content of `foo` field
    }
  }
  */
})();
```

## API

### pkgDiscovery(options?)

Returns a `Promise<object>` or `Promise<{}>` if no `package.json` was found.

### pkgDiscovery.sync(options?)

Returns the `result object` or `object empty` if no `package.json` was found.

#### options

- Type: `object`

##### field

- Type: `string`
- Default: `undefined`

If `field` option is set, all packages should contain this field.

##### dir

- Type: `string`
- Default: `process.cwd()`

Directory to start looking for a package.json file.

##### dev

- Type: `boolean`
- Defualt: `false`

When the `dev` parameter is enabled the discovery will be done in `devDependencies`, otherwise in `dependencies`.

##### exclude

- Type: `array`
- Default: `[]`

The `exclude` parameter is an array to exclude packages to be discovered.

##### filter

- Type: `function`
- Default: `undefined`

If `filter` option is set as a function, all packages will be filtered through it.
