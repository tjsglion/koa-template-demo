const argv = require('yargs-parser')(process.argv.slice(2));
const _mergeMode = argv['mode'];
const {resolve} = require('path');
const _mergeConfig = require(resolve(__dirname, './', `config/webpack.${_mergeMode}.js`));
const merge = require('webpack-merge');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin');
const entries = {}
const _plugins = [];
// 获取入口文件
const files = glob.sync('./src/client/views/**/*.entry.js');
for (let item of files) {
    if (/.+\/([a-zA-Z0-9]+-[a-zA-Z0-9]+)(\.entry\.js$)/g.test(item)) {
        const entryKeys = RegExp.$1;
        const [dir, name] = entryKeys.split('-');
        // console.log(dir, name);
        _plugins.push(new htmlWebpackPlugin({
            filename: `../views/${dir}/pages/${name}.html`, // 发布到远程
            chunks: ['runtime', entryKeys], // 配置加载需要的模块
            template: resolve(__dirname, './', `src/client/views/${dir}/pages/${name}.html`),
            inject: false // 不注入js或css
        }));
        entries[entryKeys] = item;
    }
}
const config = {
    entry: entries,
    output: {
        // publicPath: '/',
        path: resolve(__dirname, './dist/assets/'),
        filename: 'scripts/[name].[hash:8].bundle.js'
    },
    plugins: [
        ..._plugins,
        new htmlAfterWebpackPlugin(),
    ],
    resolve: {
        alias: { // 别名
            '@': resolve('./src/client/components')
        }
    },
    optimization: {
        runtimeChunk: { // 抽取运行时公共代码
            name: 'runtime'
        }
    }
};

module.exports = merge(config, _mergeConfig);
