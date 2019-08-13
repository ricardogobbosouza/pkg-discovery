const pkgDiscovery = require('..')

describe('async', () => {
  test('default', async () => {
    const pkg = await pkgDiscovery()

    expect(Object.keys(pkg)).toContain('read-pkg')
  })

  test('not found', async () => {
    expect(await pkgDiscovery({ dir: '/' })).toStrictEqual({})
    expect(await pkgDiscovery({ dir: __dirname })).toStrictEqual({})
  })

  test('exclude option', async () => {
    const pkg = await pkgDiscovery({
      exclude: ['read-pkg']
    })

    expect(Object.keys(pkg)).toContain('read-pkg-up')
  })

  test('filter option', async () => {
    const pkg = await pkgDiscovery({
      filter: items => items.filter(item => item !== 'read-pkg')
    })

    expect(Object.keys(pkg)).toContain('read-pkg-up')
  })

  test('dev option', async () => {
    const pkg = await pkgDiscovery({
      dev: true
    })

    expect(Object.keys(pkg)).toContain('jest')
  })

  test('field option', async () => {
    const pkg = await pkgDiscovery({
      field: 'name'
    })

    expect(Object.keys(pkg)).toContain('read-pkg-up')
  })

  test('field option not found', async () => {
    const pkg = await pkgDiscovery({
      field: 'foo'
    })

    expect(pkg).toStrictEqual({})
  })
})

describe('sync', () => {
  test('default', () => {
    const pkg = pkgDiscovery.sync()

    expect(Object.keys(pkg)).toContain('read-pkg')
  })

  test('not found', () => {
    expect(pkgDiscovery.sync({ dir: '/' })).toStrictEqual({})
    expect(pkgDiscovery.sync({ dir: __dirname })).toStrictEqual({})
  })

  test('exclude option', () => {
    const pkg = pkgDiscovery.sync({
      exclude: ['read-pkg']
    })

    expect(Object.keys(pkg)).toContain('read-pkg-up')
  })

  test('filter option', () => {
    const pkg = pkgDiscovery.sync({
      filter: items => items.filter(item => item !== 'read-pkg')
    })

    expect(Object.keys(pkg)).toContain('read-pkg-up')
  })

  test('dev option', () => {
    const pkg = pkgDiscovery.sync({
      dev: true
    })

    expect(Object.keys(pkg)).toContain('jest')
  })

  test('field option', () => {
    const pkg = pkgDiscovery.sync({
      field: 'name'
    })

    expect(Object.keys(pkg)).toContain('read-pkg-up')
  })

  test('field option not found', () => {
    const pkg = pkgDiscovery.sync({
      field: 'foo'
    })

    expect(pkg).toStrictEqual({})
  })
})
