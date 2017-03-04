var path = require('path');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var outputPath = argv.ENV === 'development' ? './build/js' : './dist/js';
var componentPath = path.resolve('./src/js');

// http://stackoverflow.com/questions/28572380/conditional-build-based-on-environment-using-webpack
// https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
var plugins = [
    new webpack.DefinePlugin({
        ENV: JSON.stringify(argv.ENV),
        'process.env': {
            NODE_ENV: JSON.stringify(argv.ENV)
        }
    }),
    new webpack.ProvidePlugin({})
]

if(argv.ENV != 'development'){
    plugins.push(new webpack.optimize.UglifyJsPlugin());  
}

module.exports = {
     entry: './src/js/app.js',
     output: {
        path: outputPath,
        publicPath: "/js",
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
     // See: https://seesparkbox.com/foundry/write_better_frontend_modules_with_webpack
    resolve: {
        root: componentPath,
    },
    plugins: plugins,
    node: {
        fs: "empty" // avoids error messages
    },
    devServer: { 
        watchOptions: {
            poll: true
        }
    }
};