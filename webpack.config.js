const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
   entry: {
       index: "./src/index.ts",
   },
    module: {
       rules: [
           {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/
           },
           {
               test: /\.conf$/i,
               use: 'raw-loader',
           },
           {
               test: /Dockerfile$/i,
               use: 'raw-loader',
           },
       ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: "empty"
    },
    target: 'node'
};
