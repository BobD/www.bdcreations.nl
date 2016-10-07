/*
    Useful[ later on:

    https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin
*/

var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

module.exports = {
     entry: './src/js/app.js',
     output: {
        path: './dist/js',
        publicPath: "/js",
        filename: 'app.bundle.js',
    },
    externals: {
        'env': 'argv'
    },
    module: {
        loaders: [
        	{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'	}
     	]
    },
    plugins: [
        new webpack.ProvidePlugin({
        })
	],
    node: {
        fs: "empty" // avoids error messages
    },
    devServer: { inline: true }
};