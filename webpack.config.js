const path = require('path');
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
                                //require('autoprefixer')
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.tpl$/,
                use: [
                    'ejs-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                //require('autoprefixer')
                            ]
                        }
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                //require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/i,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     query: {
                    //         name: 'assets/[name]-[hash:5].[ext]'
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 100000,    //设定最小值，小与最小值可图片被打包成dataURL base64编码
                            name: 'assets/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    },
                ],
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
    ],
    devServer: {
        contentBase: path.join(__dirname, "lib"),
        compress: true,    //启用所有服务的gzip压缩
        host: '0.0.0.0',
        port: 8001,
        
        //lazy: true,    //当lazy启用时，当它被请求的DEV-服务器将只编译软件包。这意味着webpack不会看到任何文件更改。我们称这个懒惰模式。
        //filename: "[name].bundle.js",    ///[name].bundle.js请求时才编译 。filename在没有延迟模式的情况下使用时不起作用。
    },
};