const argv = require('yargs-parser')(process.argv.slice(2));
const _mergeMode = argv['mode'];
const {resolve} = require('path');
const _mergeConfig = require(resolve(__dirname, './', `config/webpack.${_mergeMode}.js`));
const merge = require('webpack-merge');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');

const entries = {}
const _plugins = [];
// 获取入口文件
const files = glob.sync('./src/client/views/**/*.entry.js');
for (let item of files) {
    if (/.+\/([a-zA-Z0-9]+-[a-zA-Z0-9]+)(\.entry\.js$)/g.test(item)) {
        const entryKeys = RegExp.$1;
        const {dir, name} = entryKeys.split('-');
        console.log(dir, name);
        _plugins.push(new htmlWebpackPlugin({
            filename: `../views/${dir}/pages/${name}.html`,
            template: resolve(__dirname, './', `src/client/views/${dir}/pages/${name}.html`)
        }));
        entries[entryKeys] = item;
    }
}
const config = {
    entry: entries,
    plugins: [..._plugins]
};

module.exports = merge(config, _mergeConfig);
