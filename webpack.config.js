// Webpack uses this to work with directories
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  entry: './src/javascript/index.js',


  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },

        {
            test: /\.css$/,
            use: [
              {loader: MiniCssExtractPlugin.loader}
            ]
        },

          {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
        
        {    
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                   {
                     loader: "file-loader",
      
                     options: {
                       name: '[name].[ext]',
                       outputPath: 'images',
                       esModule: false,
                     }
                   }
                 ]
        },

        {
            test: /\.(html)$/,
            use: ['html-loader']
       }


    ]
  },


  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HtmlWebpackPlugin({
        inject: 'body',
        template: "src/template/template.html",
        title: "szmatki kwiatki"
      }),
  ],

  //mode: 'development'
  mode: 'production'
};