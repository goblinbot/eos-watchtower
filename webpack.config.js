const fs = require('fs');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        filename: "index.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
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
