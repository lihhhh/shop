const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
var fs = require('fs');

module.exports = function(env){
    // console.log(env);
    var dirs = fs.readdirSync(__dirname+'/src/apps');
    console.log(dirs);
    var str='';
    if(env == 1) str+='window._env = 1;\r\n\r\n';
    dirs.map(function(it){
        str+= 'require("./apps/'+it+'");\r\n';
    })
    
    fs.writeFileSync(__dirname+'/src/center.js', str);

    var cfg = {
        entry: './src/app.js',
        output: {
            path: path.resolve(path.join(__dirname,'dist')),
            filename: 'bundle.js',
            // publicPath:'/'
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
                        // name:'Images/Seller/Template/WeChat/[hash].[ext]'
                        name: env==1?'/Images/Seller/Template/WeChat/[hash].[ext]':'Images/Seller/Template/WeChat/[hash].[ext]'
                    }
                }
            },]
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 8888,
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
            })
        ]
    };

    if(env == 1) {
        // 代码压缩
        cfg.plugins.push(new MinifyPlugin());
    }

    return cfg;
}