const path = require('path');
const fs = require('fs');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    node: {
        _dirname: true
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    externals: getNodeModules(),
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new NodemonPlugin()
    ],
    devtool: "inline-source-map"
};

function getNodeModules() {
    const nodeModules = {};
    fs.readdirSync('node_modules')
        .filter(function (x) {
            return ['.bin'].indexOf(x) === -1;
        })
        .forEach(function (mod) {
            nodeModules[mod] = 'commonjs ' + mod;
        });

    return nodeModules;
}
