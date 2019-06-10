module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-size-zoom': {
      'zoom': 2,
      'unitKey': 'px',
      'changeName': 'cube-ui'
    },
    'postcss-pxtorem': {
      'rootValue': 75,
      'propList': ['*']
    }
  }
}
