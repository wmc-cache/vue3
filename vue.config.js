const path = require('path');
module.exports = {
  lintOnSave: false,
  outputDir: 'school',
  devServer: {
    proxy: {
      '/emulation': {
        target: 'http://peri.xxlun.com',
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
