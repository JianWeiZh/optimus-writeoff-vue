const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const resolve = (dir) => { return path.join(__dirname, '.', dir) }

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    config.plugins.push(new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }))
  },
  chainWebpack: config => {
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))
    }
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
