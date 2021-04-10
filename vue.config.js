const path  = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src/'),
        "@c": path.resolve(__dirname, 'src/component'),
        "@l": path.resolve(__dirname, 'src/lib')
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeIntegration: true
    }
  }
}
