// Webpack uses this to work with directories
const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

    // Path to your entry point. From this file Webpack will begin its work
    entry:{
        main:'./src/main.js',
    },

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].bundle.js',
    },

    module:{
      rules:[
        {
            test: /\.js/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.html$/i,
            use: [
              {
                loader: "html-loader",
                options: {minimize: true}
              },
            ]
        },
      ]
    },

    plugins: [
        new HTMLWebPackPlugin({
          template:path.resolve(__dirname, 'src') + "/index.html",
          filename: "./index.html"
        }),
        new MiniCSSExtractPlugin({
          //options similar to the options in webpackoptions.output
          //both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
      ],
      output: {
        filename: 'widget.[contenthash].js',
        // path: path.resolve(bundleOutputDir),
      },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript 
  // minifying and other things, so let's set mode to development
  mode: 'development'
};
