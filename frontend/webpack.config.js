const path = require("path")
const EventHooksPlugin = require("event-hooks-webpack-plugin")
const fs = require("fs")

module.exports = (env, { mode }) => ({
    mode,
    entry: './src/scss/main.scss',
    watch: true,
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        path: path.join(process.cwd(), "build"),
        // gets deleted, so the name really doesn't matter
        filename: "DELETE_ME",
        clean: true
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'file-loader',
                options: { name: 'bundle.css' }
            }, {
                loader: 'extract-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader',
                options: {
                    // Prefer Dart Sass
                    implementation: require('sass'),

                    // See https://github.com/webpack-contrib/sass-loader/issues/804
                    webpackImporter: false,
                }
            }
            ]
        }]
    },
    plugins: [
        new EventHooksPlugin({
            "done": () => {
                const build = path.join(__dirname, "build")
                if (fs.readdirSync(build).includes("DELETE_ME"))
                    fs.unlinkSync(path.join(build, "DELETE_ME"))
            }
        })
    ]
})