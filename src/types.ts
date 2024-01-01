import type React from 'react'

interface BaseTab {
  /**
   *  A machine name for the tab, ideally in PascalCase
   */
  name: string
  /**
   *  Admin label of the tab
   */
  label: string
  /**
   *  Path of the tab
   */
  path: string
}

interface TabWithSrc extends BaseTab {
  /**
   *  Admin label of the tab
   */
  src: string
  /**
   * Optionally add props to the iframe element
   */
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>
}

interface TabWithCode extends BaseTab {
  /**
   * Full HTML code for the embed (not recommended)
   */
  code: string
}

interface TabWithDynamic extends BaseTab {
  /**
   * Field path to get value for to use as src
   */
  watchField: string
  /**
   * Optionally add props to the iframe element
   */
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>
}

export type TabConfig = TabWithSrc | TabWithCode | TabWithDynamic

export interface CollectionTabConfig {
  /**
   * Slug of the collection to attach the tab to
   */
  slug: string
  tabs: TabConfig[]
}

export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  collections: CollectionTabConfig[]
}

export interface NewCollectionTypes {
  title: string
}
