import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Examples from './collections/Examples'
import Homepage from './globals/Homepage'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import iframeTabsPlugin from '../../src/index'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,

    bundler: webpackBundler(),
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  editor: slateEditor({}),
  collections: [Examples, Users],
  globals: [Homepage],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    iframeTabsPlugin({
      enabled: true,
      globals: [
        {
          slug: 'Homepage',
          tabs: [
            {
              name: 'Spongebob',
              label: 'Spongebob',
              path: '/spongebob',
              src: 'https://www.youtube.com/embed/hzond0fF4MM',
              iframeProps: {
                height: 1080,
                width: 1920,
                frameBorder: '0',
                style: { aspectRatio: '19/10', maxWidth: '100%', height: 'auto' },
              },
            },
          ],
        },
      ],
      collections: [
        {
          slug: 'examples',
          tabs: [
            {
              name: 'FirstYoutube',
              label: 'Michael Scott',
              path: '/michael-scott',
              src: 'https://www.youtube.com/embed/B9MNITrHu9E',
              iframeProps: {
                height: 1080,
                width: 1920,
                frameBorder: '0',
                style: { aspectRatio: '19/10', maxWidth: '100%', height: 'auto' },
              },
            },
            {
              name: 'FigmaDesign',
              label: 'Figma Design',
              path: '/design',
              code: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; height: auto; aspect-ratio: 19/10;" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FlwXua1GtcfZ76fGxbtJcuU%2FPayload%253A-The-last-CMS-you'll-ever-need%3Ftype%3Ddesign%26node-id%3D1%253A5%26mode%3Ddesign%26t%3D4ahl4E0NnA0SlJpS-1" allowfullscreen></iframe>`,
            },
            {
              name: 'Dynamic',
              label: 'Dynamic',
              path: '/dynamic',
              watchField: 'source',
              iframeProps: {
                height: 1080,
                width: 1920,
                frameBorder: '0',
                style: { aspectRatio: '19/10', maxWidth: '100%', height: 'auto' },
              },
            },
          ],
        },
      ],
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
})
