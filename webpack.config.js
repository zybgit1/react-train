const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack= require('webpack');
module.exports = function(env,argv){
    const isEnvDevelopment =argv.mode==='development'||!argv.mode;
    const isEnvProduction =argv.mode==='production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    devtool: isEnvProduction ? 'soure-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: 'budle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html"
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: "url-loader",
          options: {
            limit: 10000
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },

      ]
    }
  };
};


