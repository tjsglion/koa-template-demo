const copyWebpackPlugin = require('copy-webpack-plugin');
const {join} = require('path');
console.log('webpack ====>>>>>>> development');
module.exports = {
  plugins: [
    new copyWebpackPlugin([
      {
        from: join(__dirname, '../', '/src/client/components'),
        to: '../components'
      },
      {
        from: join(__dirname, '../', '/src/client/views'),
        to: '../views'
      }
    ], {
      ignore: ['*.css', '*.js', '.DS_Store'],
      copyUnmodified: true // 只在html文件变化时才重新加载
    })
  ]
}
