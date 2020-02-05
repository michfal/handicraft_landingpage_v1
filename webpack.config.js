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
            test: /\.(sa|sc|c)ss$/,
            use: [
                   {
                     loader: "css-loader",
                   },

                   {
                     loader: "postcss-loader"
                   },

                   {
                     loader: "sass-loader",
                     options: {
                       implementation: require("sass")
                     }
                   },

                    {
                    loader: MiniCssExtractPlugin.loader
                  },

                  {
                    loader: "css-loader",
                  },
                 ]
          },
        
        
        {    
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
                   {
                     loader: "file-loader",
      
                     options: {
                       outputPath: 'images'
                     }
                   }
                 ]
        },

    ]
  },


  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HtmlWebpackPlugin({
        template: "src/template/template.html",
        title: "dupa"
      }),
  ],

  mode: 'development'
};