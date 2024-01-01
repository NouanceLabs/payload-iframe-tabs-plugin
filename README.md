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
}),
```

### Src

### Code

### Dynamic


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
