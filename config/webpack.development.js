const copyWebpackPlugin = require('copy-webpack-plugin');
const {join} = require('path');

module.exports = {
  plugins: [
    new copyWebpackPlugin([
      {
        from: join(__dirname, '../', '/src/client/components'),
        to: '../components'
      }
    ], {
      ignore: ['*.css', '*.js', '.DS_Store'],
      copyUnmodified: true // 只在html文件变化时才重新加载
    }),
    new copyWebpackPlugin([
      {
        from: join(__dirname, '../src/client/views/common'),
        to: '../views/common'
      }
    ])
  ]
}
