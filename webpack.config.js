const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/lib',
        filename: 'js/[name].bundle.js',
    },
    module: {
        loaders: [
            //处理js文件
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],  //不通过该babel处理，提高打包速度。
                include: [/src/],           //指定打包范围
                query: {
                    presets: ['latest'],
                },
            },
            //处理css文件
            {
                test: /\.css$/,
                //loader: 'style-loader!css-loader!postcss-loader',    //这种写法与下面写法效果一直，执行顺序由数组尾部开始
                //loaders: ['style-loader','css-loader','postcss-loader'],    //css-loader处理完之后，style-loader会加一个style标签
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader. 在css-loader之后，指定几个loader处理import的css
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                            ]
                        }
                    },
                ]
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: "body",
            title: 'app',
        }),
    ]
};