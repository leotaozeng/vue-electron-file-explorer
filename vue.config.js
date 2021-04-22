const path  = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
        "@l": path.resolve(__dirname, 'src/lib'),
        "@a": path.resolve(__dirname, 'src/assets'),
        "@s": path.resolve(__dirname, 'src/store'),
        "@c": path.resolve(__dirname, 'src/components')
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
