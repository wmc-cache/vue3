const path = require('path');
module.exports = {
  lintOnSave: false,
  outputDir: 'wut',
  devServer: {
    proxy: {
      '/school': {
        target: 'http://192.168.8.13:9001',
        changOrigin: true
      }

    }
  },
  configureWebpack: config => {
    return {
      resolve: {
        alias: {
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/imgs'),
          '@c': path.resolve(__dirname, './src/components'),
        }
      }
    }
  }
}
