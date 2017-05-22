# webpack-signle-demo

## cli
1. 全局安装webpack
```
npm install webpack -g
```

2. 创建项目目录 & 进入项目目录
```
mkdir webpack-signle-demo & cd webpack-signle-demo
```

3. 初始化项目 package.json & 安装依赖
```
npm init & npm install
```

4. 局部安装 webpack & 安装 dev tools 到 package.json 文件中，本地运行webpack服务
```
npm install webpack --save-dev    //参数 --save-dev 意思是开发时依赖webpack
npm install webpack-dev-server --save-dev 
```
>至于为什么webpack要全局安装也要局部安装：
>全局安装之后，才可以使用webpack命令。
>局部安装，为了保存到package.json文件中。

5. 依据项目所需安装依赖  
开发依赖： `css-loader` `style-loader` `html-webpack-plugin` `vue-loader` `babel-loader` `babel-core` `babel-preset-es2015`
```
npm install babel-core --save-dev
```
项目依赖： `vue` `vuex`
```
npm install vue vuex --save
```

6. 配置webpack
在根目录下创建 webpack.config.js
```
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
```

7. 添加软件生命周期事件和命令
```json
//package.json
"scripts": {
  "dev": "webpack-dev-server --inline --hot",
  "build": "webpack -p"
}
```
在package.json文件添加dev脚本和build脚本，我们就可以用：
```
npm run dev    //运行dev server
npm run build    //来打包和压缩代码
```