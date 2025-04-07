import { nextTestSetup } from 'e2e-utils'

describe('turbopack-turbo-config-compatibility', () => {
  describe('including both turbopack and deprecated experimental turbo config', () => {
    const { next, isTurbopack } = nextTestSetup({
      files: __dirname,
    })

    if (!isTurbopack) {
      return
    }

    it('prefers turbopack config over deprecated experimental turbo config', async () => {
      const $ = await next.render$('/')
      expect($('#result').text()).toEqual('Hello turbopack')
    })
  })

  describe('only including deprecated experimental turbo config', () => {
    const { next, isTurbopack } = nextTestSetup({
      files: __dirname,
    })

    if (!isTurbopack) {
      return
    }

    beforeAll(async () => {
      await next.patchFile(
        'next.config.js',
        `module.exports = {
        experimental: {
          turbo: {
            resolveAlias: {
              foo: './turbo.js',
            },
          },
        },
      }`
      )
    })

    it('still uses the deprecated experimental turbo config', async () => {
      const $ = await next.render$('/')
      expect($('#result').text()).toEqual('Hello turbo')
    })
  })
})
