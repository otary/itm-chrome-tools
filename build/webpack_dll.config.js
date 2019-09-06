const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DllPlugin = webpack.DllPlugin;


const distDllPath = path.resolve(process.cwd(), "dist", "dll");

module.exports = {
    entry: {
        vendor: ['jquery', 'bootstrap', 'layui-layer']
    },
    output: {
        filename: "[name].dll.js",
        path: distDllPath,
        library: '_dll_[name]'
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.join(distDllPath, '[name].manifest.json')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader']
            }
        ]
    }
}


