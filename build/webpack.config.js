const path = require('path');
const {AutoWebPlugin} = require('web-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pagePath = './src/pages';
const srcPath = path.resolve(process.cwd(), 'src');
const distPath = path.resolve(process.cwd(), 'dist');

const autoWebPlugin = new AutoWebPlugin(pagePath, {
    template: (pageName) => {
        return path.resolve(pagePath, pageName, 'template.html');
    },
    requires: ['vendor']
});

module.exports = {
    entry: autoWebPlugin.entry({}),
    externals: {
        jquery: 'jQuery',
        bootstrap: 'Bootstrap'
    },
    output: {
        path: distPath,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: require.resolve('jquery'),  // require.resolve 用来获取模块的绝对路径
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
            use: ['file-loader']
        }]
    },
    resolve: {
        alias: {
            '@': srcPath
        }
    },
    plugins: [
        autoWebPlugin,
        new CopyWebpackPlugin([{
            from: srcPath,
            to: distPath,
            ignore: ['pages']
        }]),
        // new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: { // 这里开始设置缓存的 chunks
                vendor: { // key 为entry中定义的 入口名称
                    test: /[\\/]node_modules[\\/]/, // 正则规则验证，如果符合就提取 chunk
                    name: 'vendor'
                }
            }
        }
    },
    watch: true, // 启用观察
    devServer: {}
}