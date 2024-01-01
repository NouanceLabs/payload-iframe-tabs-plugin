import type { Config, Plugin } from 'payload/config'

import type { PluginTypes } from './types'
import { extendWebpackConfig } from './webpack'
import IframeComponent from './components/IframeComponent'
import type { CollectionConfig } from 'payload/dist/exports/types'

export const iframeTabsPlugin =
  (pluginOptions: PluginTypes): Plugin =>
  incomingConfig => {
    let config = { ...incomingConfig }
    const { collections } = config

    // If you need to add a webpack alias, use this function to extend the webpack config
    const webpack = extendWebpackConfig(incomingConfig)

    config.admin = {
      ...(config.admin || {}),
      webpack,
    }

    if (pluginOptions.enabled === false) {
      return config
    }

    const processedConfig: Config = {
      ...config,
      collections: [
        ...(collections
          ? collections.map(collection => {
              const targetCollection = pluginOptions.collections?.find(pluginCollection => {
                if (pluginCollection.slug === collection.slug) return true
                return false
              })

              if (targetCollection) {
                const tabs = {}
                const customProps = {}

                targetCollection.tabs.forEach(tab => {
                  Object.assign(tabs, {
                    [tab.name]: {
                      Component: IframeComponent,
                      path: tab.path,
                      Tab: {
                        label: tab.label,
                        href: tab.path,
                      },
                    },
                  })

                  Object.assign(customProps, {
                    [tab.path]: {
                      ...tab,
                    },
                  })
                })

                const collectionConfigWithHooks: CollectionConfig = {
                  ...collection,
                  admin: {
                    ...collection.admin,
                    components: {
                      ...collection.admin?.components,
                      views: {
                        ...collection.admin?.components?.views,
                        // @ts-expect-error
                        Edit: {
                          ...collection.admin?.components?.views?.Edit,
                          ...tabs,
                        },
                      },
                    },
                  },
                  custom: {
                    ...collection.custom,
                    iframesTabPlugin: {
                      ...customProps,
                    },
                  },
                }

                return collectionConfigWithHooks
              }

              return collection
            })
          : []),
      ],
    }

    return processedConfig
  }
