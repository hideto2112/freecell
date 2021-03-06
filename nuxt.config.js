module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Memory',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],
  manifest: {
    name: 'Card Memory PWA',
    lang: 'ja',
    short_name: 'Card Memory',
    start_url: '/',
    background_color: '#0f0',
    display: 'standalone',
    orientation: "landscape",
    theme_color: '#f00',
  },
  workbox: {
    dev: true, //開発環境でもPWA
    offlineAssets: ['assets/image/*'],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config) {
      if (process.server && process.browser) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

