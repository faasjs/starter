import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

const publicPath = '/examples/todo/rsbuild/'

export default defineConfig({
  plugins: [pluginReact()],
  root: __dirname,
  dev: {
    hmr: false,
    liveReload: false,
  },
  environments: {
    web: {
      output: {
        target: 'web',
      },
      source: {
        entry: {
          index: '../src/entry-client',
        },
      },
    },
    ssr: {
      output: {
        target: 'node',
        distPath: {
          root: 'dist/server',
        },
        assetPrefix: publicPath,
        legalComments: 'none',
      },
      source: {
        entry: {
          index: '../src/entry-server',
        },
      },
    },
  },
  html: {
    template: '../src/index.html',
  },
  tools: {
    rspack: {
      output: {
        publicPath,
      },
    },
  },
})
