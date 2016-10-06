 module.exports = {
     entry: './src/js/app.js',
     output: {
        path: './dist/js',
        publicPath: "/js",
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
        	{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'	}
     	]
    },
    plugins: [
	],
    node: {
        fs: "empty" // avoids error messages
    },
    devServer: { inline: true }
 };