# Payload Iframe Tabs Plugin

A plugin that easily allows you add iframes into separate tabs in the admin panel.

![iframepluginshowcase (2)](https://github.com/NouanceLabs/payload-iframe-tabs-plugin/assets/35137243/938769e5-988a-46ff-bf9d-a9e0f7e9106c)


## Installation

```bash
  yarn add @nouance/payload-iframe-tabs-plugin
  # OR
  npm i @nouance/payload-iframe-tabs-plugin
```

## Features

- [Src](#src)
- [Code](#code)
- [Dynamic](#dynamic)

## Supported tabs

Currently usage is the same for `globals` and `collections` as well.

Basic usage:

```ts
import iframeTabsPlugin from '@nouance/payload-iframe-tabs-plugin'

// ...

iframeTabsPlugin({
  enabled: true,
  collections: [
    {
      slug: 'examples',
      tabs: [
        {
          name: 'FirstYoutube',
          label: 'Michael Scott',
          path: '/michael-scott',
          src: 'https://www.youtube.com/embed/B9MNITrHu9E',
        },
      ],
    },
  ],
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
}),
```

### Base config

This config is required for all tabs.

- `name` | required | A machine name used for the tab, it must be unique and preferably written in PascalCase

- `label` | required

- `path` | required | A unique path that dictates what URL this tab will be available in

### Src

In src mode, you only need to provide the right link for the iframe to render its content. You can then pass an additional `iframeProps` to style and configure your iframe element.

- `src` | required | Full URL to embeddable content

- `iframeProps` | optional | HTML props for the Iframe element

```ts
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
```

### Code

By providing code instead we will **dangerously** render any code you provide here.  
**Use with caution.**

- `code` | required | Full markup in string format to **dangerously** render

```ts
{
  name: 'FigmaDesign',
  label: 'Figma Design',
  path: '/design',
  code: `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%; height: auto; aspect-ratio: 19/10;" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=----------" allowfullscreen></iframe>`,
},
```

### Dynamic

Dynamic mode is similar to src mode except that we can fetch your URL from a field value instead.

- `watchField` | required | Field path to watch for updates

- `iframeProps` | optional | HTML props for the Iframe element

```ts
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
```

## Contributing

For development purposes, there is a full working example of how this plugin might be used in the [dev](./dev) directory of this repo.

```bash
git clone git@github.com:NouanceLabs/payload-iframe-tabs-plugin.git \
  cd payload-iframe-tabs-plugin && yarn \
  cd dev && yarn \
  cp .env.example .env \
  vim .env \ # add your payload details
  yarn dev
```
