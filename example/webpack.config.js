"use strict"
const path = require("path");

module.exports = {
    mode: "development",
    target: "web",
    devtool:"source-map",
    entry: {
        "modules/demo": path.resolve(__dirname,"src/scripts/demo.js")
    },
    output: {
       path: path.resolve(__dirname,"src/output/"),
       filename:"[name].js"
    },
    resolve: {
        extensions:[".js"],
        modules:["node_modules"]
    },
    module: {
        rules:[
            {
                test:/\.css$/i,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/i,
                loader: "file-loader",
                options: {
                    outputPath:"../"
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    chunks: "all",
                    reuseExistingChunk: true,
                    name(module) {
                        return "lib/all";
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `lib/${packageName.replace('@', '')}`;
                    }
                },
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2,
                    reuseExistingChunk: true,
                    enforce:true //forces webpack to create a chunk(bundle) even if it's less than 30kb.
                }
            }
        }        
    }
}