const { join, dirname } = require('path')
const readPkgUp = require('read-pkg-up')
const readPkg = require('read-pkg')

module.exports = async (options = {}) => {
  const rootPkg = await readPkgUp({ cwd: options.dir })

  if (!rootPkg) {
    return {}
  }

  let items = Object.keys(rootPkg.package[options.dev ? 'devDependencies' : 'dependencies'] || {})

  if (options.exclude) {
    items = items.filter(item => !options.exclude.includes(item))
  }

  if (typeof options.filter === 'function') {
    items = await options.filter(items)
  }

  const pkgs = {}

  for (const [, value] of Object.entries(items)) {
    const cwd = dirname(require.resolve(join(value, 'package.json')))
    const pkg = await readPkg({ cwd })

    if (!options.field) {
      pkgs[value] = pkg
    } else if (pkg[options.field]) {
      pkgs[value] = pkg[options.field]
    }
  }

  return pkgs
}

module.exports.sync = (options = {}) => {
  const rootPkg = readPkgUp.sync({ cwd: options.dir })

  if (!rootPkg) {
    return {}
  }

  let items = Object.keys(rootPkg.package[options.dev ? 'devDependencies' : 'dependencies'] || {})

  if (options.exclude) {
    items = items.filter(item => !options.exclude.includes(item))
  }

  if (typeof options.filter === 'function') {
    items = options.filter(items)
  }

  const pkgs = {}

  for (const [, value] of Object.entries(items)) {
    const cwd = dirname(require.resolve(join(value, 'package.json')))
    const pkg = readPkg.sync({ cwd })

    if (!options.field) {
      pkgs[value] = pkg
    } else if (pkg[options.field]) {
      pkgs[value] = pkg[options.field]
    }
  }

  return pkgs
}
