const pluginName = 'HtmlAfterWebpackPlugin';

const assetHelps = (data) => {
    const js = [];
    const css = [];
    const dir = {
        js: (jsItem) => `<script src="${jsItem}" class="lazyload-js"></script>`,
        css: (cssItem) => `<link rel="stylesheet" class="lazyload-css" href="${cssItem}">`
    }
    for (let item of data.css) {
        css.push(dir.css(item));
    }
    for (let item of data.js) {
        js.push(dir.js(item));
    }
    return {
        js,
        css
    }
}
class HtmlAfterWebpackPlugin {
    apply (compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // console.log('webpack 自定义插件开始工作.');
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlData => {
                // console.log('webpack ====>>>>>>', htmlData);
                // 替换目录: pages: 与 components:
                let _html = htmlData.html;
                _html = _html.replace(/pages:/g, '../../');
                _html = _html.replace(/components:/g, '../../../components/');
                // 替换 <!-- injectcss --> <!-- injectjs -->
                _html = _html.replace('<!-- injectcss -->', assetHelps(htmlData.assets).css.join(''));
                _html = _html.replace('<!-- injectjs -->', assetHelps(htmlData.assets).js.join(''));
                htmlData.html = _html;
            });
        });
    }
}

module.exports = HtmlAfterWebpackPlugin;