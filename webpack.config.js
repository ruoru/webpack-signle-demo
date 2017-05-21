const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/script/main.js',
        hello: './src/script/hello.js',
        app: ['./src/script/main.js', './src/script/hello.js'],
    },
    output: {
        path: __dirname + '/lib',
        filename: 'js/[name].bundle.js',
        //publicPath: 'http:webpack.ruoru.com',    //上线时候可替换
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.bundle.html',
            inject: false,    //'head': script引用放在头部，false：不在html中引用js文件
            title: 'index',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),

        new htmlWebpackPlugin({
            template: 'index.1.html',
            filename: 'app1.bundle.html',
            inject: 'body',    //'body': script引用放在body部，false：不在html中引用js文件
            title: 'app1',
            chunks: ['main', 'hello'],
        }),
        new htmlWebpackPlugin({
            template: 'index.1.html',
            filename: 'main1.bundle.html',
            inject: 'body',    //body: script引用放在body部，false：不在html中引用js文件
            title: 'main1',
            chunks: ['main'],
        }),
        new htmlWebpackPlugin({
            template: 'index.1.html',
            filename: 'hello1.bundle.html',
            inject: 'body',    //'body': script引用放在body部，false：不在html中引用js文件
            title: 'hello1',
            chunks: ['hello'],
        }),

        new htmlWebpackPlugin({
            template: 'index.2.html',
            filename: 'app2.bundle.html',
            inject: false,
            title: 'app2s',
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: 'index.2.html',
            filename: 'hello2.bundle.html',
            inject: false,
            title: 'hello2',
            chunks: ['hello', 'app'],
        }),
    ]
};