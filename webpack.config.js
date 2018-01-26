const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
var fs = require('fs');

module.exports = function(cfg){
    var dirs = fs.readdirSync(__dirname+'/src/apps');
    console.log(dirs);
    var str='';
    dirs.map(function(it){
        str+= 'require("./apps/'+it+'");\r\n';
    })
    fs.writeFileSync(__dirname+'/src/center.js', str);

    return {
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },{ 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader']
            },{ 
                test: /\.(jpg|png|jpeg|gif)$/, 
                use: {
                    loader:'file-loader',
                    options: {
                        name:'images/[hash].[ext]'
                    }
                }
            },]
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 8002,
            proxy: {
                '*': {
                    target: 'http://localhost:3000',
                    changeOrigin: true
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            }),
            // 代码压缩
            // new MinifyPlugin()
        ]
    };
}