const path  = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
        "@c": path.resolve(__dirname, 'src/components'),
        "@l": path.resolve(__dirname, 'src/lib'),
        "@s": path.resolve(__dirname, 'src/store')
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
